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

  openUrlInput.addEventListener("paste", () => {
    setTimeout(convertDriveLink, 0);
  });

  openUrlInput.addEventListener(
    "blur",
    convertDriveLink
  );

  function convertDriveLink() {
    const driveLinks = createGoogleDriveLinks(
      openUrlInput.value
    );

    if (!driveLinks) {
      return;
    }

    openUrlInput.value = driveLinks.openUrl;
    downloadUrlInput.value = driveLinks.downloadUrl;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();

    clearMessage();

    convertDriveLink();

    const adminKey =
      sessionStorage.getItem("hubTiAdminKey");

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
      sessionStorage.removeItem("hubTiAdminKey");
      window.location.replace("admin-login.html");
      return;
    }

    if (!yearNumber) {
      showMessage(
        "Escolhe o ano.",
        "error"
      );

      yearSelect.focus();
      return;
    }

    if (!courseId) {
      showMessage(
        "Escolhe a disciplina.",
        "error"
      );

      courseSelect.focus();
      return;
    }

    if (!title) {
      showMessage(
        "Introduz o título do material.",
        "error"
      );

      document.getElementById("title").focus();
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
        openUrlInput.value.trim() || null,

      downloadUrl:
        downloadUrlInput.value.trim() || null,

      tags: document
        .getElementById("tags")
        .value
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),

      courseId
    };

    const submitButton = form.querySelector(
      'button[type="submit"]'
    );

    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "A guardar...";

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

      const result =
        await readJsonResponse(response);

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
        error.message ||
        "Não foi possível guardar o material.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });

  function showMessage(text, type) {
    message.textContent = text;
    message.className =
      `admin-message ${type}`;
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
  const fileId =
    extractGoogleDriveFileId(value);

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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}