document.addEventListener("DOMContentLoaded", async () => {
  const adminKeyInput = document.getElementById("adminKey");
  const yearSelect = document.getElementById("year");
  const courseSelect = document.getElementById("course");
  const materialsList = document.getElementById("materialsList");
  const message = document.getElementById("message");

  let selectedCourseCode = "";

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

    const yearNumber = Number(yearSelect.value);

    selectedCourseCode = "";

    courseSelect.disabled = true;
    courseSelect.innerHTML = `
      <option value="">A carregar...</option>
    `;

    materialsList.innerHTML = `
      <p class="empty-message">
        Escolhe uma disciplina.
      </p>
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

    const selectedOption =
      courseSelect.options[courseSelect.selectedIndex];

    selectedCourseCode =
      selectedOption?.dataset?.code || "";

    if (!selectedCourseCode) {
      materialsList.innerHTML = `
        <p class="empty-message">
          Escolhe uma disciplina.
        </p>
      `;

      return;
    }

    await loadMaterials();
  });

  async function loadMaterials() {
    materialsList.innerHTML = `
      <p class="empty-message">
        A carregar materiais...
      </p>
    `;

    try {
      const materials =
        await getMaterialsByCourse(selectedCourseCode);

      if (!materials.length) {
        materialsList.innerHTML = `
          <p class="empty-message">
            Esta disciplina ainda não tem materiais.
          </p>
        `;

        return;
      }

      materialsList.innerHTML = materials
        .map(
          material => `
            <article class="material-item">
              <h4>${escapeHtml(material.title)}</h4>

              <div class="material-meta">
                ${formatCategory(material.category)}
                ${formatDate(material.materialDate)}
              </div>

              ${
                material.description
                  ? `
                    <p>
                      ${escapeHtml(material.description)}
                    </p>
                  `
                  : ""
              }

              <div class="material-actions">
                ${
                  material.openUrl
                    ? `
                      <a
                        class="btn"
                        href="${escapeHtml(material.openUrl)}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Abrir
                      </a>
                    `
                    : ""
                }

                <button
                  type="button"
                  class="btn delete-btn"
                  data-delete-id="${material.id}"
                  data-delete-title="${escapeHtml(material.title)}"
                >
                  Eliminar
                </button>
              </div>
            </article>
          `
        )
        .join("");

      materialsList
        .querySelectorAll("[data-delete-id]")
        .forEach(button => {
          button.addEventListener("click", async () => {
            const materialId =
              Number(button.dataset.deleteId);

            const materialTitle =
              button.dataset.deleteTitle || "este material";

            await deleteMaterial(
              materialId,
              materialTitle,
              button
            );
          });
        });
    } catch (error) {
      materialsList.innerHTML = `
        <p class="empty-message">
          Não foi possível carregar os materiais.
        </p>
      `;

      showMessage(
        error.message ||
        "Não foi possível carregar os materiais.",
        "error"
      );
    }
  }

  async function deleteMaterial(
    materialId,
    materialTitle,
    button
  ) {
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

    if (!Number.isInteger(materialId) || materialId <= 0) {
      showMessage(
        "O identificador do material não é válido.",
        "error"
      );

      return;
    }

    const confirmed = window.confirm(
      `Tens a certeza de que queres eliminar "${materialTitle}"?`
    );

    if (!confirmed) {
      return;
    }

    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "A eliminar...";

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

      const result = await readJsonResponse(response);

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
      showMessage(
        error.message ||
        "Não foi possível eliminar o material.",
        "error"
      );

      button.disabled = false;
      button.textContent = originalText;
    }
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

function formatCategory(category) {
  const categories = {
    RESUMO: "Resumo",
    PROJETO: "Projeto",
    EXERCICIO: "Exercício",
    EXAME: "Exame"
  };

  return categories[category] || escapeHtml(category);
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return ` · ${date.toLocaleDateString("pt-PT")}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}