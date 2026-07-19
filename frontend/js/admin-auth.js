(async () => {
  const adminKey =
    sessionStorage.getItem("hubTiAdminKey");

  if (!adminKey) {
    window.location.replace("admin-login.html");
    return;
  }

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

    if (!response.ok) {
      throw new Error("Sessão inválida.");
    }
  } catch (error) {
    sessionStorage.removeItem("hubTiAdminKey");
    window.location.replace("admin-login.html");
  }
})();