document.addEventListener("DOMContentLoaded", async () => {
  const yearSelect = document.getElementById("year");
  const courseSelect = document.getElementById("course");
  const form = document.getElementById("materialForm");
  const message = document.getElementById("message");

  const openUrlInput = document.getElementById("openUrl");
  const downloadUrlInput = document.getElementById("downloadUrl");


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

    if (!yearNumber) {
      courseSelect.innerHTML = `
        <option value="">Escolher disciplina</option>
      `;

      return;
    }

    courseSelect.innerHTML = `
      <option value="">A carregar...</option>
    `;

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

  openUrlInput.addEventListener("blur", () => {
    const driveLinks = createGoogleDriveLinks(
      openUrlInput.value
    );

    if (!driveLinks) {
      return;
    }

    openUrlInput.value = driveLinks.openUrl;
    downloadUrlInput.value = driveLinks.downloadUrl;
  });


  form.addEventListener("submit", async event => {
    event.preventDefault();

    clearMessage();

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
    const yearNumber = yearSelect.value;

    if (!adminKey) {
      showMessage(
        "Introduz a chave de administração.",
        "error"
      );

      return;
    }

    if (!yearNumber) {
      showMessage(
        "Escolhe o ano.",
        "error"
      );

      return;
    }

    if (!courseId) {
      showMessage(
        "Escolhe a disciplina.",
        "error"
      );

      return;
    }

    if (!title) {
      showMessage(
        "Introduz o título do material.",
        "error"
      );

      return;
    }

    const sourceKey = createSourceKey(
      yearNumber,
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
      const submitButton = form.querySelector(
        'button[type="submit"]'
      );

      submitButton.disabled = true;
      submitButton.textContent = "A guardar...";

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

      form.reset();
     
      courseSelect.disabled = true;

      courseSelect.innerHTML = `
        <option value="">Escolher disciplina</option>
      `;
    } catch (error) {
      showMessage(
        error.message,
        "error"
      );
    } finally {
      const submitButton = form.querySelector(
        'button[type="submit"]'
      );

      submitButton.disabled = false;
      submitButton.textContent = "Guardar material";
    }
  });

  function showMessage(text, type) {
    message.textContent = text;
    message.className = `admin-message ${type}`;
  }

  function clearMessage() {
    message.textContent = "";
    message.className = "admin-message";
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



function createGoogleDriveLinks(value) {
  const fileId = extractGoogleDriveFileId(value);

  if (!fileId) {
    return null;
  }

  return {
    openUrl:
      `https://drive.google.com/file/d/${fileId}/view`,

    downloadUrl:
      `https://drive.google.com/uc?export=download&id=${fileId}`
  };
}

function extractGoogleDriveFileId(value) {
  const url = String(value || "").trim();

  if (!url) {
    return null;
  }

  const patterns = [
    /drive\.google\.com\/file\/d\/([^/?#]+)/i,
    /drive\.google\.com\/open\?id=([^&#]+)/i,
    /drive\.google\.com\/uc\?.*?[?&]id=([^&#]+)/i
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}