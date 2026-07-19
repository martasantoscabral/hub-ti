document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.querySelector(".subjects-grid");

  try {
    const courses = await getCoursesByYear(3);

    renderSidebar(courses);
    renderCourseSummary(courses);

    if (!grid) {
      return;
    }

    const semester1 = courses.filter(
      course => Number(course.semester) === 1
    );

    const semester2 = courses.filter(
      course => Number(course.semester) === 2
    );

    grid.innerHTML = `
      ${renderSemester("1.º Semestre", semester1)}
      ${renderSemester("2.º Semestre", semester2)}
    `;
  } catch (error) {
    console.error(
      "Erro ao carregar disciplinas:",
      error
    );

    if (grid) {
      grid.innerHTML = `
        <p>Não foi possível carregar as disciplinas.</p>
      `;
    }
  }
});

function renderSemester(title, courses) {
  return `
    <div class="sem-divider">
      <span class="sem-label">
        ${escapeHtml(title)}
      </span>

      <div class="sem-line"></div>
    </div>

    ${courses.map(renderCourseCard).join("")}
  `;
}

function renderCourseCard(course) {
  const color = course.color || "#7C3AED";

  return `
    <a
      class="subject-card"
      href="disciplina3.html?course=${encodeURIComponent(
        course.code
      )}"
      style="
        background: ${color}18;
        border-color: ${color}55;
        color: ${color};
      "
    >
      <span class="sc-abbr">
        ${escapeHtml(
          String(course.code).toUpperCase()
        )}
      </span>

      <span class="sc-name">
        ${escapeHtml(course.name)}
      </span>

      <span class="sc-desc">
        ${escapeHtml(course.description || "")}
      </span>
    </a>
  `;
}

function renderSidebar(courses) {
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
    <a
      class="navlink"
      style="
        font-weight: 700;
        background: #EDE9FF;
        color: #7C3AED;
      "
      href="home3.html"
    >
      🏠 Visão Geral
    </a>

    <span class="navlink1">
      1.º Semestre
    </span>

    ${semester1
      .map(course => createSidebarLink(course))
      .join("")}

    <span class="navlink1">
      2.º Semestre
    </span>

    ${semester2
      .map(course => createSidebarLink(course))
      .join("")}
  `;
}

function createSidebarLink(course) {
  return `
    <a
      class="navlink"
      href="disciplina3.html?course=${encodeURIComponent(
        course.code
      )}"
    >
      ${escapeHtml(course.name)}
    </a>
  `;
}

function renderCourseSummary(courses) {
  const container =
    document.getElementById("courseSummary");

  if (!container) {
    return;
  }

  const semester1 = courses.filter(
    course => Number(course.semester) === 1
  );

  const semester2 = courses.filter(
    course => Number(course.semester) === 2
  );

  container.innerHTML = `
    <span class="disc-sem">
      1.º Semestre
    </span>

    ${semester1
      .map(course => createSummaryItem(course))
      .join("")}

    <span class="disc-sem">
      2.º Semestre
    </span>

    ${semester2
      .map(course => createSummaryItem(course))
      .join("")}
  `;
}

function createSummaryItem(course) {
  const color = course.color || "#7C3AED";

  return `
    <li>
      <span
        class="dot"
        style="background: ${escapeHtml(color)}"
      ></span>

      ${escapeHtml(course.name)}
      (${escapeHtml(
        String(course.code).toUpperCase()
      )})
    </li>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}