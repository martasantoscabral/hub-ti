// data.js
const COURSES = [
  { id: "cc",  name: "Controvérsias Científicas" },
  { id: "em1",  name: "Elementos de Matemática I" },
  { id: "prog1", name: "Programação I" },
  { id: "ac", name: "Arquiteturas de Computadores (AC)" },

  
  { id: "ipe",  name: "Introdução às Probabilidades e Estatística" },
  { id: "em2",  name: "Elementos de Matemática II" },
  { id: "prog2",  name: "Programação II" },
  { id: "rc",  name: "Redes de Computadores" },
  { id: "itw",  name: "Introdução às Tecnologias Web" },

];

// Cada item: category, course, title, desc(opcional), date(opcional), tags(opcional), file (link)
const ITEMS = [
  
  // ------------------------------------RESUMOS ----------------------------------
  //---CC
   {
    category: "resumos",
    course: "cc",
    title: "Resumo",
    desc: "Aborda as controvérsias científicas como debates que estruturam o desenvolvimento da ciência, desde a filosofia clássica até a contemporaneidade.Mostra como o logos, o diálogo e o conflito de ideias são essenciais para a produção do conhecimento científico.",
    date: "2024-01-3",
    tags: ["Natureza", "Logos","Diálogo","Aristóteles", "Newton"],
    file: "assets/resumos/Controvérsias Científicas.pdf",
  },

  {
    category: "resumos",
    course: "em1",
    title: "Resumo 1",
    desc: "Resumo do primeiro semestre de Elementos de Matemática I",
    date: "2024-01-3",
    tags: ["matriz", "Espaço Vectoriais"],
    file: "assets/resumos/EM1-Resumo1.pdf",
  },

  {
    category: "resumos",
    course: "em1",
    title: "Resumo 2",
    desc: "Outro Resumo do primeiro semestre de Elementos de Matemática I",
    date: "2024-01-3",
    tags: ["matriz", "Espaço Vectoriais"],
    file: "assets/resumos/EM1-Resumo2.pdf",
  },


  //---PROG1
  {
    category: "resumos",
    course: "prog1",
    title: "Resumo Programação I",
    desc: "Resumo da disciplina de Programação I",
    date: "2024-01-3",
    tags: ["", ""],
    file: "assets/resumos/PROG1-Resumo_incompleto.pdf",
  },



 //-------------------------------------- PROJETOS----------------------------------
  //---PROG1
   {
    category: "projetos",
    course: "prog1",
    title: "Projeto de Programação I",
    desc: "Resolução Projeto de Programação I",
    date: "2024-01-3",
    tags: ["", ""],
    file: "assets/projetos/PROG1/Prog1-Projecto.pdf",
  },


   {
    category: "projetos",
    course: "",
    title: "",
    desc: "",
    date: "2024-01-3",
    tags: ["", ""],
    file: "",
  },


  // --------------------------------EXERCÍCIOS-------------------------------------
  //---EM1
   {
    category: "exercicios",
    course: "em1",
    title: "Enunciado Exercícios",
    desc: "Enunciado dos exercícios do primeiro semestre de Elementos de Matemática I",
    date: "2024-01-3",
    tags: ["", ""],
    file: "assets/exercicios/EM1-Enunciado.pdf",
  },

  {
    category: "exercicios",
    course: "em1",
    title: "Resolução Exercícios",
    desc: "Resolução dos exercícios do primeiro semestre de Elementos de Matemática I",
    date: "2024-01-03",
    tags: ["resolução", "exercícios"],
    fileOpen: "https://drive.google.com/file/d/1kv1QF4dNWMDE487tjocsSpGW1gNhYOcd/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1kv1QF4dNWMDE487tjocsSpGW1gNhYOcd",
  },

  //---PROG1
  {
    category: "exercicios",
    course: "prog1",
    title: "Exercícios",
    desc: "Alguns exercícios de programação I",
    date: "2024-01-3",
    tags: ["", ""],
    file: "assets/EXEC/PROG1-EXEC.pdf",
  },


  {
    category: "exercicios",
    course: "",
    title: "",
    desc: "",
    date: "2024-01-3",
    tags: ["", ""],
    file: "",
  },

];
