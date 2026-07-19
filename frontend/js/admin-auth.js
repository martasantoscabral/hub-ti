(() => {
  const adminKey = sessionStorage.getItem("hubTiAdminKey");

  if (!adminKey) {
    window.location.replace("admin-login.html");
  }
})();