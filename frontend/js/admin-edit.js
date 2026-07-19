document.addEventListener("DOMContentLoaded", async () => {
  const adminKeyInput = document.getElementById("adminKey");
  const yearSelect = document.getElementById("year");
  const courseSelect = document.getElementById("course");
  const materialSelect = document.getElementById("material");

  const editFormCard = document.getElementById("editFormCard");
  const editForm = document.getElementById("editMaterialForm");
  const message = document.getElementById("message");

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const categorySelect = document.getElementById("category");
  const materialDateInput = document.getElementById("materialDate");
  const openUrlInput = document.getElementById("openUrl");
  const downloadUrlInput = document.getElementById("downloadUrl");
  const tagsInput = document.getElementById("tags");

  let selectedCourseCode = "";
  let materials = [];
  let selectedMaterial = null;

  try {
    const years = await getAcademicYears();

    yearSelect.innerHTML = `
      <option value="">Escolher ano</option>
      ${years
        .map(
          year => `
            <option value="${year.number}">
              ${escapeHtml(year.title)}
            </option>
          `
        )
        .join("")}
    `;
  } catch (error) {
    showMessage(
      "Não foi possível carregar os anos.",
      "error"
    );
  }

  yearSelect.addEventListener("change", async () => {
    clearMessage();
    resetMaterialSelection();

    const yearNumber = Number(yearSelect.value);

    selectedCourseCode = "";

    courseSelect.disabled = true;
    courseSelect.innerHTML = `
      <option value="">A carregar...</option>
    `;

    if (!yearNumber) {
      courseSelect.innerHTML = `
        <option value="">Escolher disciplina</option>
      `;

      return;
    }

    try {
      const courses = await getCoursesByYear(yearNumber);

      courseSelect.innerHTML = `
        <option value="">Escolher disciplina</option>
        ${courses
          .map(
            course => `
              <option
                value="${course.id}"
                data-code="${escapeHtml(course.code)}"
              >
                ${escapeHtml(course.name)}
              </option>
            `
          )
          .join("")}
      `;

      courseSelect.disabled = false;
    } catch (error) {
      courseSelect.innerHTML = `
        <option value="">Erro ao carregar</option>
      `;

      showMessage(
        "Não foi possível carregar as disciplinas.",
        "error"
      );
    }
  });

  courseSelect.addEventListener("change", async () => {
    clearMessage();
    resetMaterialSelection();

    const selectedOption =
      courseSelect.options[courseSelect.selectedIndex];

    selectedCourseCode =
      selectedOption?.dataset?.code || "";

    if (!selectedCourseCode) {
      return;
    }

    await loadMaterials();
  });

  materialSelect.addEventListener("change", () => {
    clearMessage();

    const materialId = Number(materialSelect.value);

    selectedMaterial = materials.find(
      material => material.id === materialId
    );

    if (!selectedMaterial) {
      editFormCard.classList.remove("visible");
      return;
    }

    fillForm(selectedMaterial);
    editFormCard.classList.add("visible");
  });

  editForm.addEventListener("submit", async event => {
    event.preventDefault();
    clearMessage();

    const adminKey = adminKeyInput.value.trim();

    if (!adminKey) {
      showMessage(
        "Introduz primeiro a chave de administração.",
        "error"
      );

      adminKeyInput.focus();
      return;
    }

    if (!selectedMaterial) {
      showMessage(
        "Escolhe o material que pretendes editar.",
        "error"
      );

      return;
    }

    const title = titleInput.value.trim();
    const category = categorySelect.value;
    const courseId = Number(courseSelect.value);

    if (!title) {
      showMessage(
        "O título é obrigatório.",
        "error"
      );

      titleInput.focus();
      return;
    }

    const body = {
      title,

      description:
        descriptionInput.value.trim() || null,

      category,

      materialDate:
        materialDateInput.value || null,

      openUrl:
        openUrlInput.value.trim() || null,

      downloadUrl:
        downloadUrlInput.value.trim() || null,

      tags: tagsInput.value
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),

      sourceKey: createSourceKey(
        yearSelect.value,
        courseId,
        category,
        title
      ),

      courseId
    };

    const submitButton = editForm.querySelector(
      'button[type="submit"]'
    );

    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "A guardar...";

    try {
      const response = await fetch(
        `${window.APP_CONFIG.API_URL}/api/materials/${selectedMaterial.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey
          },

          body: JSON.stringify(body)
        }
      );

      const result = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          result.error ||
          "Não foi possível editar o material."
        );
      }

      showMessage(
        "Material alterado com sucesso.",
        "success"
      );

      await loadMaterials(result.id || selectedMaterial.id);
    } catch (error) {
      showMessage(
        error.message ||
        "Não foi possível editar o material.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });

  async function loadMaterials(materialIdToSelect = null) {
    materialSelect.disabled = true;

    materialSelect.innerHTML = `
      <option value="">A carregar materiais...</option>
    `;

    editFormCard.classList.remove("visible");
    selectedMaterial = null;

    try {
      materials = await getMaterialsByCourse(
        selectedCourseCode
      );

      if (!materials.length) {
        materialSelect.innerHTML = `
          <option value="">
            Esta disciplina não tem materiais
          </option>
        `;

        return;
      }

      materialSelect.innerHTML = `
        <option value="">Escolher material</option>
        ${materials
          .map(
            material => `
              <option value="${material.id}">
                ${escapeHtml(material.title)}
                — ${formatCategory(material.category)}
              </option>
            `
          )
          .join("")}
      `;

      materialSelect.disabled = false;

      if (materialIdToSelect) {
        materialSelect.value = String(materialIdToSelect);

        selectedMaterial = materials.find(
          material => material.id === materialIdToSelect
        );

        if (selectedMaterial) {
          fillForm(selectedMaterial);
          editFormCard.classList.add("visible");
        }
      }
    } catch (error) {
      materialSelect.innerHTML = `
        <option value="">Erro ao carregar materiais</option>
      `;

      showMessage(
        "Não foi possível carregar os materiais.",
        "error"
      );
    }
  }

  function fillForm(material) {
    titleInput.value = material.title || "";
    descriptionInput.value = material.description || "";
    categorySelect.value = material.category || "RESUMO";

    materialDateInput.value = formatDateForInput(
      material.materialDate
    );

    openUrlInput.value = material.openUrl || "";
    downloadUrlInput.value = material.downloadUrl || "";

    tagsInput.value = Array.isArray(material.tags)
      ? material.tags.join(", ")
      : "";
  }

  function resetMaterialSelection() {
    materials = [];
    selectedMaterial = null;

    materialSelect.disabled = true;

    materialSelect.innerHTML = `
      <option value="">Escolher material</option>
    `;

    editFormCard.classList.remove("visible");
    editForm.reset();
  }

  function showMessage(text, type) {
    message.textContent = text;
    message.className = `admin-message ${type}`;
  }

  function clearMessage() {
    message.textContent = "";
    message.className = "admin-message";
  }
});

async function readJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function formatDateForInput(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

function formatCategory(category) {
  const categories = {
    RESUMO: "Resumo",
    PROJETO: "Projeto",
    EXERCICIO: "Exercício",
    EXAME: "Exame"
  };

  return categories[category] || category;
}

function createSourceKey(
  year,
  courseId,
  category,
  title
) {
  return [
    year,
    courseId,
    category,
    slugify(title)
  ].join("-");
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}