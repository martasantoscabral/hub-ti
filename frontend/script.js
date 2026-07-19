function mostrar(id) {
  const secoes = document.querySelectorAll('.cadeira');
  secoes.forEach(sec => sec.style.display = 'none');

  document.getElementById(id).style.display = 'block';
}

// Mostrar a primeira cadeira por defeito
mostrar('so');
