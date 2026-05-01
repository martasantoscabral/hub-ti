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
    fileOpen: "https://drive.google.com/file/d/13RULwvtmfH0Mg5rB7ht-jx1GkmIKLAKH/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=13RULwvtmfH0Mg5rB7ht-jx1GkmIKLAKH",

  },

  //---EM1
  {
    category: "resumos",
    course: "em1",
    title: "Resumo 1",
    desc: "Resumo do primeiro semestre de Elementos de Matemática I",
    date: "2024-01-3",
    tags: ["matriz", "Espaço Vectoriais"],
    fileOpen: "https://drive.google.com/file/d/1rXmI81oLsIO9fSUe6LUm1UKnvgQcbke-/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1rXmI81oLsIO9fSUe6LUm1UKnvgQcbke-",


  },

  {
    category: "resumos",
    course: "em1",
    title: "Resumo 2",
    desc: "Outro Resumo do primeiro semestre de Elementos de Matemática I",
    date: "2024-01-3",
    tags: ["matriz", "Espaço Vectoriais"],
    fileOpen: "https://drive.google.com/file/d/1xKCt6VHrHwpf6goS7CsNRIx4txXwpRWC/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1xKCt6VHrHwpf6goS7CsNRIx4txXwpRWC",

  },


  //---PROG1
  {
    category: "resumos",
    course: "prog1",
    title: "Resumo Programação I",
    desc: "Resumo da disciplina de Programação I",
    date: "2024-01-3",
    tags: ["", ""],
    fileOpen: "https://drive.google.com/file/d/1pAci2B8OiXdiwYv0LbcC-uP-cnLK_1hD/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1pAci2B8OiXdiwYv0LbcC-uP-cnLK_1hD",
    
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
    fileOpen: "https://drive.google.com/file/d/1fxy2xdyoTn-3qNAPR5pZJI4N9JSpnkS0/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1fxy2xdyoTn-3qNAPR5pZJI4N9JSpnkS0",
    
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
    fileOpen: "https://drive.google.com/file/d/1mC-89MSwYUT5ceA-NdJy2SxOOh9KxDF-/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1mC-89MSwYUT5ceA-NdJy2SxOOh9KxDF-",

  },

  {
    category: "exercicios",
    course: "em1",
    title: "Resolução Exercícios",
    desc: "Resolução dos exercícios do primeiro semestre de Elementos de Matemática I",
    date: "2024-01-03",
    tags: ["resolução", "exercícios"],
    fileOpen: "https://drive.google.com/file/d/1kv1QF4dNWMDE487tjocsSpGW1gNhYOcd/view",

  },



  //---PROG1
  {
    category: "exercicios",
    course: "prog1",
    title: "Exercícios",
    desc: "Alguns exercícios de programação I",
    date: "2024-01-3",
    tags: ["", ""],
    fileOpen: "https://drive.google.com/file/d/1DRnQpblLvRkmhwMLvos42kaqiaBRf8Q4/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1DRnQpblLvRkmhwMLvos42kaqiaBRf8Q4",
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
