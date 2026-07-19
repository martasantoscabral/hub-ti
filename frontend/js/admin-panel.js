document.addEventListener("DOMContentLoaded", () => {
  const logoutButton =
    document.getElementById("logoutButton");

  logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("hubTiAdminKey");

    window.location.replace("admin-login.html");
  });
});