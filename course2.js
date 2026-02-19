//course.js
function courseName(id){
  return (COURSES.find(c => c.id === id)?.name) || id;
}

function formatDate(iso){
  if(!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-PT");
}

function renderCard(it){
  const tags = (it.tags||[]).map(t => `<span class="tag">${t}</span>`).join("");

  const openUrl = it.open || it.file;
  const downloadUrl = it.download || it.file;

  const hideDownload =
    openUrl && downloadUrl &&
    openUrl === downloadUrl &&
    openUrl.toLowerCase().endsWith(".html");

  return `
    <div class="item">
      <h4>${it.title}</h4>
      <div class="meta">
        <b>${courseName(it.course)}</b>
        ${it.date ? ` • ${formatDate(it.date)}` : ""}
      </div>
      ${it.desc ? `<div class="muted">${it.desc}</div>` : ""}
      ${tags ? `<div class="tags">${tags}</div>` : ""}
      <div class="actions">
        ${openUrl ? `<a class="btn primary" href="${openUrl}" target="_blank" rel="noopener">Abrir</a>` : ""}
        ${downloadUrl && !hideDownload ? `<a class="btn" href="${downloadUrl}" download>Download</a>` : ""}
      </div>
    </div>
  `;
}




function fillSection(courseId, category, containerId, emptyId){
  let list = ITEMS.filter(it => it.course === courseId && it.category === category);
  list.sort((a,b) => (b.date||"").localeCompare(a.date||""));

  const wrap = document.getElementById(containerId);
  const empty = document.getElementById(emptyId);

  if (!list.length){
    wrap.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  // Só agrupa nos PROJETOS
  if (category !== "projetos") {
    wrap.innerHTML = list.map(renderCard).join("");
    return;
  }

  // Projetos: agrupar por group (ou "Outros")
  const groups = {};
  list.forEach(it => {
    const g = it.group || "Outros";
    (groups[g] ||= []).push(it);
  });

  let html = "";
  Object.keys(groups).forEach(groupName => {
    html += `
      <div class="project-group">
        <h4 class="project-group-title">${groupName}</h4>
        <div class="grid">
          ${groups[groupName].map(renderCard).join("")}
        </div>
      </div>
    `;
  });

  wrap.innerHTML = html;
}









function setActiveSidebar(courseId){
  document.querySelectorAll(".sidebar a.navlink").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href.includes(`course=${courseId}`)) a.classList.add("active");
    else a.classList.remove("active");
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const courseId = params.get("course") || "ic";

  document.getElementById("courseTitle").textContent = courseName(courseId);

  setActiveSidebar(courseId);

  fillSection(courseId, "resumos", "resumos", "resumosEmpty");
  fillSection(courseId, "projetos", "projetos", "projetosEmpty");
  fillSection(courseId, "exercicios", "exercicios", "exerciciosEmpty");
});
