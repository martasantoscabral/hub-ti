const API_URL = window.APP_CONFIG?.API_URL;

if (!API_URL) {
  throw new Error("O endereço da API não está configurado.");
}


async function apiRequest(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.error || "Não foi possível comunicar com o servidor."
    );
  }

  return response.json();
}

async function getAcademicYears() {
  return apiRequest("/api/years");
}

async function getCoursesByYear(yearNumber, semester) {
  let endpoint = `/api/years/${yearNumber}/courses`;

  if (semester) {
    endpoint += `?semester=${semester}`;
  }

  return apiRequest(endpoint);
}

async function getMaterialsByCourse(courseCode, category) {
  let endpoint = `/api/courses/${courseCode}/materials`;

  if (category) {
    endpoint += `?category=${category}`;
  }

  return apiRequest(endpoint);
}