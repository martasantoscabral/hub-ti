// data.js
const COURSES = [
  { id: "so",  name: "Sistema Operativo" },
  { id: "ic",  name: "Interação com Computadores" },
  { id: "pco", name: "Programação Centrada a Objetos" },
  { id: "ftv", name: "Fund. e Técnicas de Visualização" },
  { id: "bd",  name: "Bases de Dados" },
  
  { id: "adas",  name: "Análise e Desenho de Aplicações e Serviços" },
  { id: "si",  name: "Sistemas Inteligentes" },
  { id: "asw",  name: "Aplicações e Serviços na Web" },
  { id: "ads",  name: "Análise e Desenho de Software" },
  { id: "ad",  name: "Aplicações Distribuídas" },

];

// Cada item: category, course, title, desc(opcional), date(opcional), tags(opcional), file (link)
const ITEMS = [
  // ----------------------------------------------RESUMOS -------------------------------------------------
  
  //---BD
   {
    category: "resumos",
    course: "bd",
    title: "Resumo 1",
    desc: "fundamentos, modelo relacional, SQL básico e avançado, modelação entidade-associação, armazenamento, indexação, processamento e otimização de queries, transações, bases de dados NoSQL, distribuídas e na cloud, data warehousing, business intelligence, big data e analytics.",
    date: "2026-01-3",
    tags: ["SQL", "Modelo Relacional", "Atributos","VIEWS", "Otimização", "JSON"],
    file: "assets/resumos/BD - Resumo.pdf",
  },


  //---IC
   {
    category: "resumos",
    course: "ic",
    title: "Usabilidade e Design Centrado no Utilizador",
    desc: "Princípios de usabilidade, ciclo iterativo de design, análise de utilizadores e tarefas.",
    date: "2025-03-15",
    tags: ["design", "ux", "usabilidade"],
    file: "assets/resumos/IC-Resumo (2).pdf",
  },

  {
    category: "resumos",
    course: "ic",
    title: "Avaliação com Utilizadores",
    desc: "Testes de usabilidade, SUS, SEQ, ASQ, avaliação formativa e sumativa.",
    date: "2025-03-15",
    tags: ["usabilidade", "avaliação", "testes"],
    file: "assets/resumos/Resumo IC -2 (1).pdf",
  },


  //------SO
  {
    category: "resumos",
    course: "so",
    title: "Primeira Parte - Introdução ate Escalonamento",
    desc: "Definição e funções do SO, estruturas (monolítico/camadas/microkernel), system calls, processos/threads e algoritmos de escalonamento (FCFS, SJF, SRTF, RR).",
    date: "2025-03-15",
    tags: ["processos", "threads", "escalonamento", "system calls"],
    file: "assets/resumos/SO-resumo-1 (1).pdf",
 },

   {
    category: "resumos",
    course: "so",
    title: "Segunda Parte - Sincronização ate Máquinas Virtuais",
    desc: "Sincronização + Gestão de Memória + Memória Virtual + Interface/Implementação de Sistema de Ficheiros + Armazenamento + Entradas e Saídas + Proteção + Segurança + Máquinas Virtuais",
    date: "2026-01-3",
    tags: ["Locks", "Semáforos","Memória","Paginação","E/S"],
    file: "assets/resumos/SO - Resumo(2).pdf", 
 },


 //----PCO
  {
    category: "resumos",
    course: "pco",
    title: "Programação Centrada em Objetos",
    desc: "Resumo feito pela Professora : Isabel Nunes, 2019",
    date: "2025-03-15",
    tags: ["Resumo","Professora", "matéria"],
    file: "assets/resumos/PCOimpresso.pdf",
 },

  //---FTV
   {
    category: "resumos",
    course: "ftv",
    title: "Resumo 1",
    desc: "Fundamentos de computação gráfica e visualização de dados, abrangendo transformações, projeções, iluminação, modelos de cor, tipos de dados e técnicas de interação.",
    date: "2026-01-3",
    tags: ["design", "ux", "usabilidade"],
    file: "assets/resumos/FTV-Resumo1.pdf",
  },

  {
    category: "resumos",
    course: "ftv",
    title: "Complemento do Resumo 1",
    desc: " Grelhas, Dados Escalares,Isolinha e Isosuperfície",
    date: "2026-01-3",
    tags: [" Grelhas", " Dados Escalares", "Isolinha", "Isosuperfície"],
    file: "assets/resumos/FTV-Resumo2.pdf",
  },


  //-------------------------------------- PROJETOS----------------------------------
  //------BD
  {
    category: "projetos",
    course: "bd",
    title: "Enunciado",
    desc: "Enunciado do Projeto de BD 25/26.",
    date: "2025-09-19",
    tags: ["docs"],
    file: "assets/projetos/BD/bd-enunciado projeto.pdf",
  },


  //------IC
  {
    category: "projetos",
    course: "ic",
    title: "Enunciado - SmartPlants",
    desc: "Enunciado do Projeto de IC 25/26",
    date: "2025-09-19",
    tags: ["relatorio"],
    group: "Projeto Final",

    file: "assets/projetos/IC/IC25-26-Enunciado-projeto.pdf",
  },


  {
    category: "projetos",
    course: "ic",
    title: "Relatório da Avaliação Informal dos projetos",
    desc: "",
    date: "2025-09-19",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-AvalProjs.pdf",
  },


  {
    category: "projetos",
    course: "ic",
    title: "Primeira versão do Questionário Levantamento Requisitos",
    desc: "",
    date: "2025-09-26",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-QuestionarioInicial.pdf",
  },



    {
    category: "projetos",
    course: "ic",
    title: "Entrevista — Levantamento de Requisitos (Grupo)",
    desc: "",
    date: "2025-10-03",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-Entrevista.pdf",
    },
    {
    category: "projetos",
    course: "ic",
    title: "Questionário Final — Levantamento de Requisitos (Grupo)",
    desc: "",
    date: "2025-10-03",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-QuestionarioFinal.pdf",
    },
    {
    category: "projetos",
    course: "ic",
    title: "Respostas — Questionário Final (Grupo)",
    desc: "",
    date: "2025-10-03",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-QuestionarioFinalRespostas.pdf",
    },


  {
    category: "projetos",
    course: "ic",
    title: "Relatório Levantamento Requisitos (Grupo)",
    desc: "",
    date: "2025-10-03",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-RelatorioRequisitos.pdf",
  },

  {
    category: "projetos",
    course: "ic",
    title: "Cenários Tarefas (Grupo)",
    desc: "",
    date: "2025-10-03",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-CenariosTarefas (5).pdf",
  },

  {
    category: "projetos",
    course: "ic",
    title: "Apresentação sobre o Levantamento de Requisitos (Grupo)",
    desc: "",
    date: "2025-10-07",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-ApresentaçãoRequisitos.pptx",
  },

  {
    category: "projetos",
    course: "ic",
    title: "Storyboards (Individual)",
    desc: "",
    date: "2025-10-19",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-64686-Storyboards (1).pdf",
  },


  {
    category: "projetos",
    course: "ic",
    title: "PBFs (Individual)",
    desc: "",
    date: "2025-10-07",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-64686-PBF (2).pdf",
  },

    {
    category: "projetos",
    course: "ic",
    title: "PBF Conjunto (Grupo)",
    desc: "",
    date: "2025-10-29",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-PBF-Conjunto (5).pdf",
  },


  {
    category: "projetos",
    course: "ic",
    title: "Relatório Avaliações Heurísticas ao PF1 (Individual)",
    desc: "",
    date: "2025-10-19",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-64686-Aval-Heuristica.pdf",
  },


  {
    category: "projetos",
    course: "ic",
    title: "Relatório Consolidado Avaliações Heurísticas ao PF1 (Grupo)",
    desc: "",
    date: "2025-11-16",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-Gy19-RelatorioAH-Consolidado (1).pdf",
  },


  {
    category: "projetos",
    course: "ic",
    title: "Primeira versão do Guião Experimental (Grupo)",
    desc: "",
    date: "2025-11-16",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-GuiaoExperimental-Inicial.pdf",
  },

  {
    category: "projetos",
    course: "ic",
    title: "Versão Final do Guião Experimental (Grupo)",
    desc: "",
    date: "2025-11-16",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-GuiaoExperimental-Final.pdf",

  },

  {
    category: "projetos",
    course: "ic",
    title: "Protótipo Funcional (Grupo)",
    desc: "Protótipo funcional navegável + ficheiros do projeto.",
    date: "2025-11-16",
    tags: ["protótipo", "grupo", "final"],
    group: "Projeto Final",
    open: "assets/projetos/IC/IC-T12-G19-PrototipoFuncional/IC-T12-G19-SMARTPLANTS/html/index.html",
    download: "assets/projetos/IC/IC-T12-G19-PrototipoFuncional.zip",
  },


  {
    category: "projetos",
    course: "ic",
    title: "Apresentação Final (Grupo)",
    desc: "",
    date: "2025-11-16",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-ApresentaçãoFinal.pptx",
  },

  {
    category: "projetos",
    course: "ic",
    title: "Relatório Consolidado das Avaliações com Utilizadores (Grupo)",
    desc: "",
    date: "2025-11-16",
    tags: ["relatorio"],
    file: "assets/projetos/IC/IC-T12-G19-RelatorioConsolidadoAvaliacoes (1).pdf",
  },

  //-----PCO
  {
    category: "projetos",
    course: "pco",
    title: "Enunciado do Projeto de PCO 25/26",
    desc: "",
    date: "2025-11-16",
    tags: ["relatorio"],
    group: "Projeto Final",
    file: "assets/projetos/PCO/TrabPCO-Corrigido-13Nov.pdf",
  },

  {
    category: "projetos",
    course: "pco",
    title: "Ficheiros dado pela Professora",
    desc: "",
    date: "2025-11-16",
    tags: ["Código", "java"],
    file: "assets/projetos/PCO/ProjetoAlunos (4).zip",
  },
    {
    category: "projetos",
    course: "pco",
    title: "Projeto final",
    desc: "Ficheiros que eram para fazer de acordo com o enunciado (feito grupo de 2)",
    date: "2025-11-16",
    tags: ["Código","java"],
    group: "Projeto Final",
    file: "assets/projetos/PCO/PCO018.zip",
  },


  //---FTV
  {
    category: "projetos",
    course: "ftv",
    title: "Enunciado - AutoCAD",
    desc: "",
    date: "2025-11-16",
    tags: ["relatório"],
    file: "assets/projetos/FTV/proj_AutoCAD2526.pdf",
  },

  {
    category: "projetos",
    course: "ftv",
    title: "Projeto - AutoCAD",
    desc: "",
    date: "2025-11-16",
    tags: ["relatório"],
    file: "assets/projetos/FTV/RELATORIO-FTV-GRUPO19.pdf",
  },

    {
    category: "projetos",
    course: "ftv",
    title: "Projeto Final - AutoCAD",
    desc: "",
    date: "2025-11-16",
    group: "Projeto Final",
    tags: ["zip"],
    group: "Projeto Final",

    file: "assets/projetos/FTV/ftv.zip",
  },

  {
    category: "projetos",
    course: "ftv",
    title: "Enunciado - ParaView",
    desc: "",
    date: "2025-11-16",
    tags: ["relatório"],
    file: "assets/projetos/FTV/proj_Paraview2526-v2.pdf",
  },

  {
    category: "projetos",
    course: "ftv",
    title: "Ficheiro de Dados - ParaView",
    desc: "",
    date: "2025-11-16",
    tags: ["dados","vtk"],
    file: "assets/projetos/FTV/ReflorAltitude.vtk",
  },


    {
    category: "projetos",
    course: "ftv",
    title: "Relatório - ParaView",
    desc: "",
    date: "2025-11-16",
    tags: ["zip"],
    file: "assets/projetos/FTV/Relatório FTV Paraview .pdf",
  },


  {
    category: "projetos",
    course: "ftv",
    title: "Projeto Final - ParaView",
    desc: "",
    date: "2025-11-16",
    tags: ["zip"],
    group: "Projeto Final",
    file: "assets/projetos/FTV/FTV19.zip",
  },



  // --------------------------EXERCÍCIOS-------------------------------------
  //------BD
  {
    category: "exercicios",
    course: "bd",
    title: "Exame Modelo 2025/2026",
    desc: "Enunciado dos Exercícios do Exame Modelo 2025/2026. O exame exato foi muito semelhante ao do modelo, mas com algumas pequenas alterações.",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/Exame_Modelo_BD.pdf",
  },

  {
    category: "exercicios",
    course: "bd",
    title: "Resolução Exame Modelo",
    desc: "Resolução dos Exercícios do Exame Modelo 2025/2026",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/Exame_Modelo_BD_Solucoes.pdf",
  },

  //------IC
  {
    category: "exercicios",
    course: "ic",
    title: "Exercícios - 2º teste",
    desc: "Avaliação com Utilizadores, Princípios de design, Desenho de páginas Web, Avaliação Heurística, Desenho de Ecrãs",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/exec-IC-2teste (1).pdf",
  },



  //------FTV
  {
    category: "exercicios",
    course: "ftv",
    title: "Enunciado dos Exercícios de Exame",
    desc: "Enunciado dos Exercícios de Exame / sem respodas",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/ftv-docs.pdf",
  },

  {
    category: "exercicios",
    course: "ftv",
    title: "Exercícios de Exame",
    desc: "Resolução dos Exercícios de Exame (do enunciado/docs)",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/ftv-exec-docs.pdf",
  },

  {
    category: "exercicios",
    course: "ftv",
    title: "Exercícios de Exame (F/V)",
    desc: "Resolução dos Exercícios de Exame (F/V) com explicação",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/ftv-F ou V.pdf",
  },

 //------SO
  {
    category: "exercicios",
    course: "so",
    title: "Resolução dos Exercícios Moodle",
    desc: "Resolução dos Exercícios Moodle anos anteriores",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/SO-2teste-moodle.pdf",
  },

 //------PCO
  {
    category: "exercicios",
    course: "pco",
    title: "Resolução dos Exercícios de Exame 1 fase 2019/2020",
    desc: "Resolução dos Exercícios de Exame 1 fase 2019/2020",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/PCO-exame (1) 2019_2020.pdf",
  },

  {
    category: "exercicios",
    course: "pco",
    title: "Resolução dos Exercícios de Exame 2 fase 2019/2020",
    desc: "Resolução dos Exercícios de Exame 2 fase 2019/2020",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/PCO-exame (2) 2019_2020.pdf",
  },

  {
    category: "exercicios",
    course: "pco",
    title: "Resolução dos Exercícios de Exame 1 fase 2020/2021",
    desc: "Resolução dos Exercícios de Exame 1 fase 2020/2021",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/PCO-exame (1) 2020_2021.pdf",
  },
  {
    category: "exercicios",
    course: "pco",
    title: "Resolução dos Exercícios de Exame 2 fase 2020/2021",
    desc: "Resolução dos Exercícios de Exame 2 fase 2020/2021",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/PCO-exame (2) 2020_2021.pdf",
  },

  {
    category: "exercicios",
    course: "pco",
    title: "Resolução dos Exercícios de Exame 1 fase 2021/2022",
    desc: "Resolução dos Exercícios de Exame 1 fase 2021/2022",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/PCO-exame (1) 2021_2022 (1).pdf",
  },

  {
    category: "exercicios",
    course: "pco",
    title: "Resolução dos Exercícios de Exame 2 fase 2021/2022",
    desc: "Resolução dos Exercícios de Exame 2 fase 2021/2022",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/PCO-exame (2) 2021_2022.pdf",
  },
  {
    category: "exercicios",
    course: "pco",
    title: "Resolução dos Exercícios de Exame 1 fase 2022/2023",
    desc: "Resolução dos Exercícios de Exame 1 fase 2022/2023",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/PCO-exame (1) 2022_2023.pdf",
  },

  {
    category: "exercicios",
    course: "pco",
    title: "Resolução dos Exercícios de Exame 2 fase 2022/2023",
    desc: "Resolução dos Exercícios de Exame 2 fase 2022/2023",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/PCO-exame (2) 2022_2023.pdf",
  },

  {
    category: "exercicios",
    course: "pco",
    title: "Resolução dos Exercícios de Exame 1 fase 2025/2026 Igual ao 2022/2023",
    desc: "Resolução dos Exercícios de Exame 1 fase 2025/2026 Igual ao 2022/2023",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    file: "assets/EXEC/PCO-exame (1) 2022_2023.pdf",
  },

];
