document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.querySelector(".subjects-grid");

  if (!grid) {
    return;
  }

  try {
    const courses = await getCoursesByYear(1);

    const semester1 = courses.filter(course => course.semester === 1);
    const semester2 = courses.filter(course => course.semester === 2);

    grid.innerHTML = `
      ${renderSemester("1.º Semestre", semester1)}
      ${renderSemester("2.º Semestre", semester2)}
    `;
  } catch (error) {
    console.error("Erro ao carregar disciplinas:", error);

    grid.innerHTML = `
      <p>Não foi possível carregar as disciplinas.</p>
    `;
  }
});

function renderSemester(title, courses) {
  return `
    <div class="sem-divider">
      <span class="sem-label">${title}</span>
      <div class="sem-line"></div>
    </div>

    ${courses.map(renderCourseCard).join("")}
  `;
}

function renderCourseCard(course) {
  return `
    <a
      class="subject-card"
      href="disciplina1.html?course=${course.code}"
      style="
        background: ${course.color}18;
        border-color: ${course.color}55;
        color: ${course.color};
      "
    >
      <span class="sc-abbr">
        ${course.code.toUpperCase()}
      </span>

      <span class="sc-name">
        ${course.name}
      </span>

      <span class="sc-desc">
        ${course.description || ""}
      </span>
    </a>
  `;
}