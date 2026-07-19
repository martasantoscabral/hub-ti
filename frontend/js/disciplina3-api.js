document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const courseCode = params.get("course");

  const courseTitle = document.getElementById("courseTitle");
  const courseDescription = document.getElementById("course-desc");
  const coursePill = document.getElementById("course-pill");
  const mainContent = document.getElementById("main-content");

  const resumosContainer = document.getElementById("resumos");
  const projetosContainer = document.getElementById("projetos");
  const exerciciosContainer = document.getElementById("exercicios");

  const resumosEmpty = document.getElementById("resumosEmpty");
  const projetosEmpty = document.getElementById("projetosEmpty");
  const exerciciosEmpty = document.getElementById("exerciciosEmpty");

  if (!courseCode) {
    showCourseError("Não foi indicada nenhuma disciplina.");
    return;
  }

  try {
    const courses = await getCoursesByYear(3);

    renderSidebar(courses, courseCode);

    const course = courses.find(
      item =>
        String(item.code).toLowerCase() ===
        String(courseCode).toLowerCase()
    );

    if (!course) {
      showCourseError("A disciplina não foi encontrada.");
      return;
    }

    applyCourseInformation(course);

    const materials = await getMaterialsByCourse(course.code);

    const resumos = materials.filter(
      material => material.category === "RESUMO"
    );

    const projetos = materials.filter(
      material => material.category === "PROJETO"
    );

    const exercicios = materials.filter(
      material =>
        material.category === "EXERCICIO" ||
        material.category === "EXAME"
    );

    renderMaterials(
      resumos,
      resumosContainer,
      resumosEmpty
    );

    renderMaterials(
      projetos,
      projetosContainer,
      projetosEmpty
    );

    renderMaterials(
      exercicios,
      exerciciosContainer,
      exerciciosEmpty
    );
  } catch (error) {
    console.error(
      "Erro ao carregar a disciplina:",
      error
    );

    showCourseError(
      "Não foi possível carregar esta disciplina."
    );
  }

  function applyCourseInformation(course) {
    const color = course.color || "#7C3AED";

    courseTitle.textContent = course.name;

    courseDescription.textContent =
      course.description || "";

    coursePill.textContent =
      String(course.code).toUpperCase();

    coursePill.style.background = color;

    mainContent.style.setProperty(
      "--course-color",
      color
    );

    const header =
      document.getElementById("course-header");

    if (header) {
      header.style.background = createTransparentColor(
        color,
        "18"
      );

      header.style.borderColor = createTransparentColor(
        color,
        "55"
      );
    }

    document.title =
      `${course.name} — Hub TI 2.º Ano`;
  }
});

function renderSidebar(courses, currentCourseCode) {
  const sidebar =
    document.getElementById("coursesSidebar");

  if (!sidebar) {
    return;
  }

  const semester1 = courses.filter(
    course => Number(course.semester) === 1
  );

  const semester2 = courses.filter(
    course => Number(course.semester) === 2
  );

  sidebar.innerHTML = `
    <a class="navlink" href="home3.html">
      🏠 Visão Geral
    </a>

    <span class="navlink1">
      1.º Semestre
    </span>

    ${semester1
      .map(course =>
        createSidebarLink(
          course,
          currentCourseCode
        )
      )
      .join("")}

    <span class="navlink1">
      2.º Semestre
    </span>

    ${semester2
      .map(course =>
        createSidebarLink(
          course,
          currentCourseCode
        )
      )
      .join("")}
  `;
}

function createSidebarLink(
  course,
  currentCourseCode
) {
  const isActive =
    String(course.code).toLowerCase() ===
    String(currentCourseCode).toLowerCase();

  const activeStyle = isActive
    ? `
      font-weight: 700;
      background: #EDE9FF;
      color: #7C3AED;
    `
    : "";

  return `
    <a
      class="navlink"
      href="disciplina3.html?course=${encodeURIComponent(
        course.code
      )}"
      style="${activeStyle}"
    >
      ${escapeHtml(course.name)}
    </a>
  `;
}

function renderMaterials(
  materials,
  container,
  emptyMessage
) {
  if (!container || !emptyMessage) {
    return;
  }

  if (!materials.length) {
    container.innerHTML = "";
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  container.innerHTML = materials
    .map(renderMaterialCard)
    .join("");
}

function renderMaterialCard(material) {
  const tags = Array.isArray(material.tags)
    ? material.tags
    : [];

  const hasOpenUrl = Boolean(material.openUrl);
  const hasDownloadUrl = Boolean(
    material.downloadUrl
  );

  return `
    <article class="item">

      <h4>
        ${escapeHtml(material.title)}
      </h4>

      ${
        material.materialDate
          ? `
            <div class="meta">
              ${formatDate(material.materialDate)}
            </div>
          `
          : ""
      }

      ${
        material.description
          ? `
            <p>
              ${escapeHtml(material.description)}
            </p>
          `
          : ""
      }

      ${
        tags.length
          ? `
            <div class="tags">
              ${tags
                .map(
                  tag => `
                    <span class="tag">
                      ${escapeHtml(tag)}
                    </span>
                  `
                )
                .join("")}
            </div>
          `
          : ""
      }

      ${
        hasOpenUrl || hasDownloadUrl
          ? `
            <div class="actions">

              ${
                hasOpenUrl
                  ? `
                    <a
                      class="btn primary"
                      href="${escapeHtml(
                        material.openUrl
                      )}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir
                    </a>
                  `
                  : ""
              }

              ${
                hasDownloadUrl
                  ? `
                    <a
                      class="btn"
                      href="${escapeHtml(
                        material.downloadUrl
                      )}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  `
                  : ""
              }

            </div>
          `
          : ""
      }

    </article>
  `;
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("pt-PT");
}

function createTransparentColor(
  color,
  opacity
) {
  const normalizedColor =
    String(color || "").trim();

  if (/^#[0-9A-Fa-f]{6}$/.test(normalizedColor)) {
    return `${normalizedColor}${opacity}`;
  }

  return normalizedColor || "#7C3AED";
}

function showCourseError(message) {
  const title =
    document.getElementById("courseTitle");

  const description =
    document.getElementById("course-desc");

  const pill =
    document.getElementById("course-pill");

  if (title) {
    title.textContent = "Erro";
  }

  if (description) {
    description.textContent = message;
  }

  if (pill) {
    pill.textContent = "!";
    pill.style.background = "#DC2626";
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