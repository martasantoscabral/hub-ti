document.addEventListener("DOMContentLoaded", () => {
  const existingAdminKey =
    sessionStorage.getItem("hubTiAdminKey");

  if (existingAdminKey) {
    window.location.replace("admin.html");
    return;
  }

  const form = document.getElementById("loginForm");
  const adminKeyInput = document.getElementById("adminKey");
  const message = document.getElementById("message");

  form.addEventListener("submit", async event => {
    event.preventDefault();

    clearMessage();

    const adminKey = adminKeyInput.value.trim();

    if (!adminKey) {
      showMessage(
        "Introduz a chave de administração.",
        "error"
      );

      return;
    }

    const submitButton = form.querySelector(
      'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "A verificar...";

    try {
      const response = await fetch(
        `${window.APP_CONFIG.API_URL}/api/admin/verify`,
        {
          method: "POST",
          headers: {
            "x-admin-key": adminKey
          }
        }
      );

      const result = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          result.error ||
          "A chave de administração não é válida."
        );
      }

      sessionStorage.setItem(
        "hubTiAdminKey",
        adminKey
      );

      window.location.href = "admin.html";
    } catch (error) {
      showMessage(
        error.message ||
        "Não foi possível validar a chave.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Entrar";
    }
  });

  function showMessage(text, type) {
    message.textContent = text;
    message.className = `login-message ${type}`;
  }

  function clearMessage() {
    message.textContent = "";
    message.className = "login-message";
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