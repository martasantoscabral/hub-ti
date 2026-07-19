document.addEventListener("DOMContentLoaded", async () => {
  const yearSelect = document.getElementById("year");
  const courseSelect = document.getElementById("course");
  const form = document.getElementById("materialForm");
  const message = document.getElementById("message");
  const materialsContainer = document.getElementById("adminMaterials");

  let selectedCourseCode = "";

  try {
    const years = await getAcademicYears();

    yearSelect.innerHTML = `
      <option value="">Escolher ano</option>
      ${years
        .map(
          year => `
            <option value="${year.number}">
              ${year.title}
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
    const yearNumber = Number(yearSelect.value);

    selectedCourseCode = "";

    courseSelect.disabled = true;
    courseSelect.innerHTML = `
      <option value="">A carregar...</option>
    `;

    materialsContainer.innerHTML = `
      <p>Escolhe uma disciplina.</p>
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
                data-code="${course.code}"
              >
                ${course.name}
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
    const selectedOption =
      courseSelect.options[courseSelect.selectedIndex];

    selectedCourseCode =
      selectedOption?.dataset?.code || "";

    if (!selectedCourseCode) {
      materialsContainer.innerHTML = `
        <p>Escolhe uma disciplina.</p>
      `;

      return;
    }

    await loadMaterials();
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();

    message.className = "admin-message";
    message.textContent = "";

    const adminKey = document
      .getElementById("adminKey")
      .value
      .trim();

    const title = document
      .getElementById("title")
      .value
      .trim();

    const category = document
      .getElementById("category")
      .value;

    const courseId = Number(courseSelect.value);

    const sourceKey = createSourceKey(
      yearSelect.value,
      courseId,
      category,
      title
    );

    const body = {
      sourceKey,
      title,

      description:
        document
          .getElementById("description")
          .value
          .trim() || null,

      category,

      materialDate:
        document
          .getElementById("materialDate")
          .value || null,

      openUrl:
        document
          .getElementById("openUrl")
          .value
          .trim() || null,

      downloadUrl:
        document
          .getElementById("downloadUrl")
          .value
          .trim() || null,

      tags: document
        .getElementById("tags")
        .value
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),

      courseId
    };

    try {
      const response = await fetch(
        `${window.APP_CONFIG.API_URL}/api/materials`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey
          },

          body: JSON.stringify(body)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
          "Não foi possível guardar o material."
        );
      }

      showMessage(
        "Material guardado com sucesso.",
        "success"
      );

      const savedAdminKey = adminKey;
      const savedYear = yearSelect.value;
      const savedCourse = courseSelect.value;
      const savedCourseCode = selectedCourseCode;

      form.reset();

      document.getElementById("adminKey").value =
        savedAdminKey;

      yearSelect.value = savedYear;
      courseSelect.value = savedCourse;
      selectedCourseCode = savedCourseCode;

      await loadMaterials();
    } catch (error) {
      showMessage(error.message, "error");
    }
  });

  async function loadMaterials() {
    materialsContainer.innerHTML = `
      <p>A carregar materiais...</p>
    `;

    try {
      const materials =
        await getMaterialsByCourse(selectedCourseCode);

      if (!materials.length) {
        materialsContainer.innerHTML = `
          <p>Esta disciplina ainda não tem materiais.</p>
        `;

        return;
      }

      materialsContainer.innerHTML = materials
        .map(
          material => `
            <div class="item" style="margin-bottom: 12px;">
              <h4>${escapeHtml(material.title)}</h4>

              <div class="meta">
                ${escapeHtml(material.category)}
              </div>

              <div class="actions">
                ${
                  material.openUrl
                    ? `
                      <a
                        class="btn"
                        href="${escapeHtml(material.openUrl)}"
                        target="_blank"
                        rel="noopener"
                      >
                        Abrir
                      </a>
                    `
                    : ""
                }

                <button
                  type="button"
                  class="btn"
                  data-delete-id="${material.id}"
                >
                  Eliminar
                </button>
              </div>
            </div>
          `
        )
        .join("");

      materialsContainer
        .querySelectorAll("[data-delete-id]")
        .forEach(button => {
          button.addEventListener("click", async () => {
            const materialId =
              Number(button.dataset.deleteId);

            await deleteMaterial(materialId);
          });
        });
    } catch (error) {
      materialsContainer.innerHTML = `
        <p>Não foi possível carregar os materiais.</p>
      `;
    }
  }

  async function deleteMaterial(materialId) {
    const adminKey = document
      .getElementById("adminKey")
      .value
      .trim();

    if (!adminKey) {
      showMessage(
        "Introduz primeiro a chave de administração.",
        "error"
      );

      return;
    }

    const confirmed = window.confirm(
      "Tens a certeza de que queres eliminar este material?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${window.APP_CONFIG.API_URL}/api/materials/${materialId}`,
        {
          method: "DELETE",

          headers: {
            "x-admin-key": adminKey
          }
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
          "Não foi possível eliminar o material."
        );
      }

      showMessage(
        "Material eliminado com sucesso.",
        "success"
      );

      await loadMaterials();
    } catch (error) {
      showMessage(error.message, "error");
    }
  }

  function showMessage(text, type) {
    message.textContent = text;
    message.className = `admin-message ${type}`;
  }
});

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