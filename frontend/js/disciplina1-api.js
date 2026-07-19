document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const courseCode = params.get("course") || "so";

  try {
    const courses = await getCoursesByYear(1);
    const course = courses.find(item => item.code === courseCode);

    if (!course) {
      showPageError("A disciplina não foi encontrada.");
      return;
    }

    document.getElementById("courseTitle").textContent = course.name;
    document.getElementById("course-desc").textContent =
      course.description || "";

    setActiveSidebar(courseCode);

    const materials = await getMaterialsByCourse(courseCode);

    fillSection(
      materials,
      "RESUMO",
      "resumos",
      "resumosEmpty"
    );

    fillSection(
      materials,
      "PROJETO",
      "projetos",
      "projetosEmpty"
    );

    fillSection(
      materials,
      "EXERCICIO",
      "exercicios",
      "exerciciosEmpty"
    );
  } catch (error) {
    console.error("Erro ao carregar a disciplina:", error);
    showPageError("Não foi possível carregar a disciplina.");
  }
});

function fillSection(materials, category, containerId, emptyId) {
  const container = document.getElementById(containerId);
  const empty = document.getElementById(emptyId);

  const filtered = materials.filter(
    material => material.category === category
  );

  if (!filtered.length) {
    container.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";
  container.innerHTML = filtered.map(renderMaterialCard).join("");
}

function renderMaterialCard(material) {
  const tags = (material.tags || [])
    .filter(Boolean)
    .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");

  return `
    <div class="item">
      <h4>${escapeHtml(material.title)}</h4>

      <div class="meta">
        ${
          material.materialDate
            ? formatDate(material.materialDate)
            : ""
        }
      </div>

      ${
        material.description
          ? `<div class="muted">${escapeHtml(material.description)}</div>`
          : ""
      }

      ${tags ? `<div class="tags">${tags}</div>` : ""}

      <div class="actions">
        ${
          material.openUrl
            ? `
              <a
                class="btn primary"
                href="${escapeAttribute(material.openUrl)}"
                target="_blank"
                rel="noopener"
              >
                Abrir
              </a>
            `
            : ""
        }

        ${
          material.downloadUrl
            ? `
              <a
                class="btn"
                href="${escapeAttribute(material.downloadUrl)}"
                target="_blank"
                rel="noopener"
              >
                Download
              </a>
            `
            : ""
        }
      </div>
    </div>
  `;
}

function setActiveSidebar(courseCode) {
  document.querySelectorAll(".sidebar .navlink").forEach(link => {
    const href = link.getAttribute("href") || "";

    link.classList.toggle(
      "active",
      href.includes(`course=${courseCode}`)
    );
  });
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("pt-PT");
}

function showPageError(message) {
  const content = document.querySelector("main.content");

  if (content) {
    content.innerHTML = `
      <div class="card">
        <p>${escapeHtml(message)}</p>
      </div>
    `;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}