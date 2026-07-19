document.addEventListener("DOMContentLoaded", async () => {
  const yearSelect = document.getElementById("year");
  const courseSelect = document.getElementById("course");
  const form = document.getElementById("materialForm");
  const message = document.getElementById("message");

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
              <option value="${course.id}">
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

      form.reset();

      document.getElementById("adminKey").value =
        savedAdminKey;

      courseSelect.disabled = true;

      courseSelect.innerHTML = `
        <option value="">Escolher disciplina</option>
      `;
    } catch (error) {
      showMessage(error.message, "error");
    }
  });

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