document.addEventListener("DOMContentLoaded", () => {
  const button =
    document.getElementById("mobileMenuButton");

  const sidebar =
    document.querySelector(".sidebar");

  const overlay =
    document.getElementById("sidebarOverlay");

  if (!button || !sidebar || !overlay) {
    return;
  }

  function openMenu() {
    sidebar.classList.add("mobile-open");
    overlay.classList.add("visible");

    button.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add(
      "menu-open"
    );
  }

  function closeMenu() {
    sidebar.classList.remove("mobile-open");
    overlay.classList.remove("visible");

    button.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove(
      "menu-open"
    );
  }

  button.addEventListener("click", () => {
    const isOpen =
      sidebar.classList.contains("mobile-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener(
    "click",
    closeMenu
  );

  sidebar.addEventListener("click", event => {
    if (
      event.target.closest("a") &&
      window.innerWidth <= 800
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      closeMenu();
    }
  });

  document.addEventListener(
    "keydown",
    event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    }
  );
});