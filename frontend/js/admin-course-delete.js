document.addEventListener("DOMContentLoaded", async () => {
  const academicYearSelect =
    document.getElementById("academicYear");

  const courseSelect =
    document.getElementById("course");

  const courseCard =
    document.getElementById("courseCard");

  const courseDetails =
    document.getElementById("courseDetails");

  const deleteButton =
    document.getElementById("deleteCourseButton");

  const message =
    document.getElementById("message");

  let years = [];
  let courses = [];
  let selectedCourse = null;

  try {
    years = await getAcademicYears();

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

  academicYearSelect.addEventListener(
    "change",
    async () => {
      clearMessage();
      resetCourseSelection();

      const selectedYearId = Number(
        academicYearSelect.value
      );

      const selectedYear = years.find(
        year => year.id === selectedYearId
      );

      if (!selectedYear) {
        return;
      }

      courseSelect.disabled = true;

      courseSelect.innerHTML = `
        <option value="">
          A carregar disciplinas...
        </option>
      `;

      try {
        courses = await getCoursesByYear(
          selectedYear.number
        );

        if (!courses.length) {
          courseSelect.innerHTML = `
            <option value="">
              Este ano não tem disciplinas
            </option>
          `;

          return;
        }

        courseSelect.innerHTML = `
          <option value="">
            Escolher disciplina
          </option>

          ${courses
            .map(
              course => `
                <option value="${course.id}">
                  ${escapeHtml(course.name)}
                  (${escapeHtml(
                    String(course.code).toUpperCase()
                  )})
                </option>
              `
            )
            .join("")}
        `;

        courseSelect.disabled = false;
      } catch (error) {
        courseSelect.innerHTML = `
          <option value="">
            Erro ao carregar disciplinas
          </option>
        `;

        showMessage(
          "Não foi possível carregar as disciplinas.",
          "error"
        );
      }
    }
  );

  courseSelect.addEventListener("change", () => {
    clearMessage();

    const courseId = Number(courseSelect.value);

    selectedCourse = courses.find(
      course => course.id === courseId
    );

    if (!selectedCourse) {
      courseCard.classList.remove("visible");
      courseDetails.innerHTML = "";
      return;
    }

    courseDetails.innerHTML = `
      <h4>
        ${escapeHtml(selectedCourse.name)}
      </h4>

      <p>
        <strong>Código:</strong>
        ${escapeHtml(
          String(selectedCourse.code).toUpperCase()
        )}
      </p>

      <p>
        <strong>Semestre:</strong>
        ${Number(selectedCourse.semester) === 1
          ? "1.º semestre"
          : "2.º semestre"}
      </p>

      ${
        selectedCourse.description
          ? `
            <p>
              <strong>Descrição:</strong>
              ${escapeHtml(selectedCourse.description)}
            </p>
          `
          : ""
      }
    `;

    courseCard.classList.add("visible");
  });

  deleteButton.addEventListener("click", async () => {
    clearMessage();

    if (!selectedCourse) {
      showMessage(
        "Escolhe primeiro uma disciplina.",
        "error"
      );

      return;
    }

    const confirmed = window.confirm(
      `Tens a certeza de que queres eliminar a disciplina "${selectedCourse.name}"?`
    );

    if (!confirmed) {
      return;
    }

    const adminKey =
      sessionStorage.getItem("hubTiAdminKey");

    const originalText =
      deleteButton.textContent;

    deleteButton.disabled = true;
    deleteButton.textContent = "A eliminar...";

    try {
      const response = await fetch(
        `${window.APP_CONFIG.API_URL}/api/courses/${selectedCourse.id}`,
        {
          method: "DELETE",

          headers: {
            "x-admin-key": adminKey
          }
        }
      );

      const result =
        await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          result.error ||
          "Não foi possível eliminar a disciplina."
        );
      }

      showMessage(
        "Disciplina eliminada com sucesso.",
        "success"
      );

      const deletedCourseId = selectedCourse.id;

      courses = courses.filter(
        course => course.id !== deletedCourseId
      );

      courseSelect.innerHTML = `
        <option value="">
          Escolher disciplina
        </option>

        ${courses
          .map(
            course => `
              <option value="${course.id}">
                ${escapeHtml(course.name)}
                (${escapeHtml(
                  String(course.code).toUpperCase()
                )})
              </option>
            `
          )
          .join("")}
      `;

      selectedCourse = null;
      courseCard.classList.remove("visible");
      courseDetails.innerHTML = "";

      if (!courses.length) {
        courseSelect.disabled = true;

        courseSelect.innerHTML = `
          <option value="">
            Este ano não tem disciplinas
          </option>
        `;
      }
    } catch (error) {
      showMessage(
        error.message ||
        "Não foi possível eliminar a disciplina.",
        "error"
      );
    } finally {
      deleteButton.disabled = false;
      deleteButton.textContent = originalText;
    }
  });

  function resetCourseSelection() {
    courses = [];
    selectedCourse = null;

    courseSelect.disabled = true;

    courseSelect.innerHTML = `
      <option value="">
        Escolher disciplina
      </option>
    `;

    courseCard.classList.remove("visible");
    courseDetails.innerHTML = "";
  }

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