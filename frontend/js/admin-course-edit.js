document.addEventListener("DOMContentLoaded", async () => {
  const academicYearSelect =
    document.getElementById("academicYear");

  const courseSelect =
    document.getElementById("course");

  const editAcademicYearSelect =
    document.getElementById("editAcademicYear");

  const editCard =
    document.getElementById("editCard");

  const form =
    document.getElementById("editCourseForm");

  const message =
    document.getElementById("message");

  const semesterSelect =
    document.getElementById("semester");

  const codeInput =
    document.getElementById("code");

  const nameInput =
    document.getElementById("name");

  const descriptionInput =
    document.getElementById("description");

  const colorInput =
    document.getElementById("color");

  let years = [];
  let courses = [];
  let selectedCourse = null;

  try {
    years = await getAcademicYears();

    const yearsOptions = years
      .map(
        year => `
          <option value="${year.id}">
            ${escapeHtml(year.title)}
          </option>
        `
      )
      .join("");

    academicYearSelect.innerHTML = `
      <option value="">Escolher ano</option>
      ${yearsOptions}
    `;

    editAcademicYearSelect.innerHTML = `
      <option value="">Escolher ano</option>
      ${yearsOptions}
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
        courseSelect.disabled = true;

        courseSelect.innerHTML = `
          <option value="">
            Escolher disciplina
          </option>
        `;

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
      editCard.classList.remove("visible");
      form.reset();
      return;
    }

    fillForm(selectedCourse);
    editCard.classList.add("visible");
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    clearMessage();

    if (!selectedCourse) {
      showMessage(
        "Escolhe primeiro uma disciplina.",
        "error"
      );

      return;
    }

    const adminKey =
      sessionStorage.getItem("hubTiAdminKey");

    const academicYearId = Number(
      editAcademicYearSelect.value
    );

    const semester = Number(
      semesterSelect.value
    );

    const code = codeInput.value.trim();
    const name = nameInput.value.trim();

    const description =
      descriptionInput.value.trim();

    const color =
      colorInput.value.trim();

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
        "O código da disciplina é obrigatório.",
        "error"
      );

      codeInput.focus();
      return;
    }

    if (!name) {
      showMessage(
        "O nome da disciplina é obrigatório.",
        "error"
      );

      nameInput.focus();
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

    const originalText =
      submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "A guardar...";

    try {
      const response = await fetch(
        `${window.APP_CONFIG.API_URL}/api/courses/${selectedCourse.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey
          },

          body: JSON.stringify(body)
        }
      );

      const result =
        await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          result.error ||
          "Não foi possível editar a disciplina."
        );
      }

      showMessage(
        "Disciplina alterada com sucesso.",
        "success"
      );

      selectedCourse = result;

      await reloadCourseList(result.id);
    } catch (error) {
      showMessage(
        error.message ||
        "Não foi possível editar a disciplina.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });

  function fillForm(course) {
    editAcademicYearSelect.value =
      String(course.academicYearId);

    semesterSelect.value =
      String(course.semester);

    codeInput.value =
      course.code || "";

    nameInput.value =
      course.name || "";

    descriptionInput.value =
      course.description || "";

    colorInput.value =
      course.color || "";
  }

  async function reloadCourseList(
    courseIdToSelect
  ) {
    const selectedYearId = Number(
      academicYearSelect.value
    );

    const selectedYear = years.find(
      year => year.id === selectedYearId
    );

    if (!selectedYear) {
      return;
    }

    courses = await getCoursesByYear(
      selectedYear.number
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

    courseSelect.disabled = false;
    courseSelect.value =
      String(courseIdToSelect);

    selectedCourse = courses.find(
      course => course.id === courseIdToSelect
    );

    if (selectedCourse) {
      fillForm(selectedCourse);
      editCard.classList.add("visible");
    }
  }

  function resetCourseSelection() {
    courses = [];
    selectedCourse = null;

    courseSelect.disabled = true;

    courseSelect.innerHTML = `
      <option value="">
        Escolher disciplina
      </option>
    `;

    editCard.classList.remove("visible");
    form.reset();
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