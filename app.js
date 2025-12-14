// app.js
function courseName(id){
  return (COURSES.find(c => c.id === id)?.name) || id;
}

function formatDate(iso){
  if(!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-PT");
}

function getCategoryFromPage(){
  const main = document.querySelector("main.content");
  return main?.dataset?.category || "";
}

function buildCourseOptions(select){
  select.innerHTML = `
    <option value="all">Todas</option>
    ${COURSES.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
  `;
}

function matchesQuery(item, q){
  if(!q) return true;
  const hay = [
    item.title, item.desc, courseName(item.course), (item.tags||[]).join(" ")
  ].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}

function render(){
  const category = getCategoryFromPage();
  const courseSel = document.getElementById("courseFilter");
  const q = document.getElementById("search").value.trim();

  let list = ITEMS.filter(it => it.category === category);

  const course = courseSel.value;
  if(course !== "all") list = list.filter(it => it.course === course);
  if(q) list = list.filter(it => matchesQuery(it, q));

  // ordenar por data desc (se houver)
  list.sort((a,b) => (b.date||"").localeCompare(a.date||""));

  const wrap = document.getElementById("items");
  const empty = document.getElementById("empty");

  wrap.innerHTML = "";
  empty.style.display = list.length ? "none" : "block";

  for(const it of list){
    const el = document.createElement("div");
    el.className = "item";

    const tags = (it.tags||[]).map(t => `<span class="tag">${t}</span>`).join("");

    const openUrl = it.open || it.file;
    const downloadUrl = it.download || it.file;

    // só esconder download se for exatamente o mesmo html
    const hideDownload =
    openUrl &&
    downloadUrl &&
    openUrl === downloadUrl &&
    openUrl.toLowerCase().endsWith(".html");

    el.innerHTML = `
    <h4>${it.title}</h4>
    <div class="meta">
        <b>${courseName(it.course)}</b>
        ${it.date ? ` • ${formatDate(it.date)}` : ""}
    </div>
    ${it.desc ? `<div class="muted">${it.desc}</div>` : ""}
    ${tags ? `<div class="tags">${tags}</div>` : ""}

    <div class="actions">
        ${openUrl ? `
        <a class="btn primary" href="${openUrl}" target="_blank" rel="noopener">
            Abrir
        </a>
        ` : ""}

        ${downloadUrl && !hideDownload ? `
        <a class="btn" href="${downloadUrl}" download>
            Download
        </a>
        ` : ""}
    </div>
    `;







    wrap.appendChild(el);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const courseSel = document.getElementById("courseFilter");
  if(courseSel) buildCourseOptions(courseSel);

  document.getElementById("search")?.addEventListener("input", render);
  document.getElementById("courseFilter")?.addEventListener("change", render);

  render();
});
