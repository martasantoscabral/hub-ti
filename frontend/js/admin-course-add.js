document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("courseForm");
  const academicYearSelect =
    document.getElementById("academicYear");
  const message = document.getElementById("message");

  try {
    const years = await getAcademicYears();

    academicYearSelect.innerHTML = `
      <option value="">Escolher ano</option>
      ${years
        .map(
          year => `
            <option value="${year.id}">
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

  form.addEventListener("submit", async event => {
    event.preventDefault();

    clearMessage();

    const adminKey =
      sessionStorage.getItem("hubTiAdminKey");

    const academicYearId = Number(
      academicYearSelect.value
    );

    const semester = Number(
      document.getElementById("semester").value
    );

    const code = document
      .getElementById("code")
      .value
      .trim();

    const name = document
      .getElementById("name")
      .value
      .trim();

    const description = document
      .getElementById("description")
      .value
      .trim();

    const color = document
      .getElementById("color")
      .value
      .trim();

    if (!academicYearId) {
      showMessage(
        "Escolhe o ano académico.",
        "error"
      );

      return;
    }

    if (![1, 2].includes(semester)) {
      showMessage(
        "Escolhe o semestre.",
        "error"
      );

      return;
    }

    if (!code) {
      showMessage(
        "Introduz o código da disciplina.",
        "error"
      );

      return;
    }

    if (!name) {
      showMessage(
        "Introduz o nome da disciplina.",
        "error"
      );

      return;
    }

    const body = {
      code,
      name,
      description: description || null,
      semester,
      color: color || null,
      academicYearId
    };

    const submitButton = form.querySelector(
      'button[type="submit"]'
    );

    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "A guardar...";

    try {
      const response = await fetch(
        `${window.APP_CONFIG.API_URL}/api/courses`,
        {
          method: "POST",

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
          "Não foi possível guardar a disciplina."
        );
      }

      showMessage(
        "Disciplina guardada com sucesso.",
        "success"
      );

      form.reset();
    } catch (error) {
      showMessage(
        error.message ||
        "Não foi possível guardar a disciplina.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
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