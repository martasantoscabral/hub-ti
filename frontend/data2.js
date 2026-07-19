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
    fileOpen: "https://drive.google.com/file/d/11DIk7lasZzvDvySZ1J15Q0KOI_mGsE-H/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=11DIk7lasZzvDvySZ1J15Q0KOI_mGsE-H",
    
  },


  //---IC
   {
    category: "resumos",
    course: "ic",
    title: "Usabilidade e Design Centrado no Utilizador",
    desc: "Princípios de usabilidade, ciclo iterativo de design, análise de utilizadores e tarefas.",
    date: "2025-03-15",
    tags: ["design", "ux", "usabilidade"],
    fileOpen: "https://drive.google.com/file/d/1nYGO_XqXByFtaJ47n9DwWnr-9zh_HWZ_/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1nYGO_XqXByFtaJ47n9DwWnr-9zh_HWZ_",
    
  },

  {
    category: "resumos",
    course: "ic",
    title: "Avaliação com Utilizadores",
    desc: "Testes de usabilidade, SUS, SEQ, ASQ, avaliação formativa e sumativa.",
    date: "2025-03-15",
    tags: ["usabilidade", "avaliação", "testes"],
    fileOpen: "https://drive.google.com/file/d/1K12lD15FE83oZqU2BVTQSy8dJvhWHn9J/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1K12lD15FE83oZqU2BVTQSy8dJvhWHn9J",
    
  },


  //------SO
  {
    category: "resumos",
    course: "so",
    title: "Primeira Parte - Introdução ate Escalonamento",
    desc: "Definição e funções do SO, estruturas (monolítico/camadas/microkernel), system calls, processos/threads e algoritmos de escalonamento (FCFS, SJF, SRTF, RR).",
    date: "2025-03-15",
    tags: ["processos", "threads", "escalonamento", "system calls"],
    fileOpen: "https://drive.google.com/file/d/1-Q7CajaMQvYHF7IzBeuUQbazZt0Sf9xz/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1-Q7CajaMQvYHF7IzBeuUQbazZt0Sf9xz", 
    
 },

   {
    category: "resumos",
    course: "so",
    title: "Segunda Parte - Sincronização ate Máquinas Virtuais",
    desc: "Sincronização + Gestão de Memória + Memória Virtual + Interface/Implementação de Sistema de Ficheiros + Armazenamento + Entradas e Saídas + Proteção + Segurança + Máquinas Virtuais",
    date: "2026-01-3",
    tags: ["Locks", "Semáforos","Memória","Paginação","E/S"],
    fileOpen: "https://drive.google.com/file/d/1apgky28nrQoO07NnLHnUh_OO0LkUt7hy/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1apgky28nrQoO07NnLHnUh_OO0LkUt7hy",
    
 },


 //----PCO
  {
    category: "resumos",
    course: "pco",
    title: "Programação Centrada em Objetos",
    desc: "Resumo feito pela Professora : Isabel Nunes, 2019",
    date: "2025-03-15",
    tags: ["Resumo","Professora", "matéria"],
    fileOpen: "https://drive.google.com/file/d/1l2pH4-4cujbx1BLxrTflKUJy6vb1sKC5/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1l2pH4-4cujbx1BLxrTflKUJy6vb1sKC5",
    
 },

  //---FTV
   {
    category: "resumos",
    course: "ftv",
    title: "Resumo 1",
    desc: "Fundamentos de computação gráfica e visualização de dados, abrangendo transformações, projeções, iluminação, modelos de cor, tipos de dados e técnicas de interação.",
    date: "2026-01-3",
    tags: ["design", "ux", "usabilidade"],
    fileOpen: "https://drive.google.com/file/d/1jAkjTToNdyRVl8vHlJFi26Fw-Eeqfg6T/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1jAkjTToNdyRVl8vHlJFi26Fw-Eeqfg6T",
    
  },

  {
    category: "resumos",
    course: "ftv",
    title: "Complemento do Resumo 1",
    desc: " Grelhas, Dados Escalares,Isolinha e Isosuperfície",
    date: "2026-01-3",
    tags: [" Grelhas", " Dados Escalares", "Isolinha", "Isosuperfície"],
    fileOpen: "https://drive.google.com/file/d/1lROaAdO3MFFfbx4VCRpEoOBOBWetFSNC/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1lROaAdO3MFFfbx4VCRpEoOBOBWetFSNC",
  },


  //------SI
  {
    category: "resumos",
    course: "si",
    title: "Resumo Sistemas Inteligentes ",
    desc: "",
    date: "2026-07-17",
    tags: ["Resumo"],
    fileOpen: "https://drive.google.com/file/d/1-oGc4Is2ZdqRe0xauLT6gXZA0js-hSsd/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1-oGc4Is2ZdqRe0xauLT6gXZA0js-hSsd",
  },

  //------AD
  {
    category: "resumos",
    course: "ad",
    title: "Resumos de Aplicações Distribuídas Teoricas",
    desc: "resume imcopleto da matéria de Aplicações Distribuídas",
    date: "2025-02-25",
    tags: ["Resumo","exame"],
    fileOpen: "https://drive.google.com/file/d/15AXEn4HJcVUeemBH8ghb-_rKrRZYgDlB/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=15AXEn4HJcVUeemBH8ghb-_rKrRZYgDlB",
  },

  {
    category: "resumos",
    course: "ad",
    title: "Resumos de Aplicações Distribuídas Teoricas-Praticas",
    desc: "resume imcopleto da matéria de Aplicações Distribuídas",
    date: "2025-02-25",
    tags: ["Resumo","exame"],
    fileOpen: "https://drive.google.com/file/d/10JJ0JTfVUrBMVSIHSfZa1jHB37OXGuXN/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=10JJ0JTfVUrBMVSIHSfZa1jHB37OXGuXN",
  },




  //------ASW
  {
    category: "resumos",
    course: "asw",
    title: "Resumo ASW - Aplicações e Serviços na Web",
    desc: "Resumo completo sobre a Aplicações e Serviços na Web",
    date: "2026-05-02",
    tags: ["web", "rest api", "mvc", "segurança"],
    fileOpen: "https://drive.google.com/file/d/1LJLZ3Tr18Eoj19NR04Hru-MV_pRREsLJ/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1LJLZ3Tr18Eoj19NR04Hru-MV_pRREsLJ",
  },


  {
    category: "resumos",
    course: "asw",
    title: "Resumo ASW 2",
    desc: "Resumo mais pequeno (geral) sobre a cadeira de asw",
    date: "2026-07-17",
    tags: ["web", "rest api", "mvc", "segurança"],
    fileOpen: "https://drive.google.com/file/d/1k13wORZLOAmKrCnRmznsLsg4xhBKDo4Z/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1k13wORZLOAmKrCnRmznsLsg4xhBKDo4Z",
  },



  //------ADS
  {
    category: "resumos",
    course: "ads",
    title: "Resumo/Slides (ADS)- Dado pelo professor Carlos Lourenço",
    desc: "Disciplina sobre análise de requisitos e desenho de software OO, usando UML, desenvolvimento iterativo (UP) e boas práticas para criar sistemas bem estruturados e organizados em camadas. ",
    date: "2026-05-02",
    tags: ["ads", "uml", "oop", "design", "arquitetura"],
    fileOpen: "https://drive.google.com/file/d/1BTqdwb5x7T-UcWYvXsBPXG3KviPfTso4/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1BTqdwb5x7T-UcWYvXsBPXG3KviPfTso4",

  },

  {
    category: "resumos",
    course: "ads",
    title: "(ADS)- Resumo para exame",
    desc: "Resumo do que pode sair no exame 2026",
    date: "2026-05-02",
    tags: ["ads", "Resumo","Exame"],
    fileOpen: "https://drive.google.com/file/d/1Pro5yZpHOJssyF2nOzjyszafzqePbIaz/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1Pro5yZpHOJssyF2nOzjyszafzqePbIaz",

  },


  {
    category: "resumos",
    course: "ads",
    title: "(ADS)- Resumo para o teste de projeto",
    desc: "Resumo do que poderia sair no teste do projeto -> saber bem os relatorios",
    date: "2026-05-02",
    tags: ["ads", "Resumo", "Teste",],
    fileOpen: "https://drive.google.com/file/d/1RHt16q0cacRWvcduqeDghmhf4tlqdQEM/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1RHt16q0cacRWvcduqeDghmhf4tlqdQEM",

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
    fileOpen: "https://drive.google.com/file/d/1GeNF2JFAp1STh57mQMMsF64gfkKDxThi/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1GeNF2JFAp1STh57mQMMsF64gfkKDxThi",
  },


  //------IC
  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Enunciado - SmartPlants",
  //   desc: "Enunciado do Projeto de IC 25/26",
  //   date: "2025-09-19",
  //   tags: ["relatorio"],
  //   group: "Projeto Final",

  //   file: "assets/projetos/IC/IC25-26-Enunciado-projeto.pdf",
  // },


  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Relatório da Avaliação Informal dos projetos",
  //   desc: "",
  //   date: "2025-09-19",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-AvalProjs.pdf",
  // },


  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Primeira versão do Questionário Levantamento Requisitos",
  //   desc: "",
  //   date: "2025-09-26",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-QuestionarioInicial.pdf",
  // },



  //   {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Entrevista — Levantamento de Requisitos (Grupo)",
  //   desc: "",
  //   date: "2025-10-03",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-Entrevista.pdf",
  //   },
  //   {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Questionário Final — Levantamento de Requisitos (Grupo)",
  //   desc: "",
  //   date: "2025-10-03",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-QuestionarioFinal.pdf",
  //   },
  //   {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Respostas — Questionário Final (Grupo)",
  //   desc: "",
  //   date: "2025-10-03",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-QuestionarioFinalRespostas.pdf",
  //   },


  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Relatório Levantamento Requisitos (Grupo)",
  //   desc: "",
  //   date: "2025-10-03",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-RelatorioRequisitos.pdf",
  // },

  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Cenários Tarefas (Grupo)",
  //   desc: "",
  //   date: "2025-10-03",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-CenariosTarefas (5).pdf",
  // },

  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Apresentação sobre o Levantamento de Requisitos (Grupo)",
  //   desc: "",
  //   date: "2025-10-07",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-ApresentaçãoRequisitos.pptx",
  // },

  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Storyboards (Individual)",
  //   desc: "",
  //   date: "2025-10-19",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-64686-Storyboards (1).pdf",
  // },


  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "PBFs (Individual)",
  //   desc: "",
  //   date: "2025-10-07",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-64686-PBF (2).pdf",
  // },

  //   {
  //   category: "projetos",
  //   course: "ic",
  //   title: "PBF Conjunto (Grupo)",
  //   desc: "",
  //   date: "2025-10-29",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-PBF-Conjunto (5).pdf",
  // },


  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Relatório Avaliações Heurísticas ao PF1 (Individual)",
  //   desc: "",
  //   date: "2025-10-19",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-64686-Aval-Heuristica.pdf",
  // },


  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Relatório Consolidado Avaliações Heurísticas ao PF1 (Grupo)",
  //   desc: "",
  //   date: "2025-11-16",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-Gy19-RelatorioAH-Consolidado (1).pdf",
  // },


  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Primeira versão do Guião Experimental (Grupo)",
  //   desc: "",
  //   date: "2025-11-16",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-GuiaoExperimental-Inicial.pdf",
  // },

  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Versão Final do Guião Experimental (Grupo)",
  //   desc: "",
  //   date: "2025-11-16",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-GuiaoExperimental-Final.pdf",

  // },

  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Protótipo Funcional (Grupo)",
  //   desc: "Protótipo funcional navegável + ficheiros do projeto.",
  //   date: "2025-11-16",
  //   tags: ["protótipo", "grupo", "final"],
  //   group: "Projeto Final",
  //   open: "assets/projetos/IC/IC-T12-G19-PrototipoFuncional/IC-T12-G19-SMARTPLANTS/html/index.html",
  //   download: "assets/projetos/IC/IC-T12-G19-PrototipoFuncional.zip",
  // },


  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Apresentação Final (Grupo)",
  //   desc: "",
  //   date: "2025-11-16",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-ApresentaçãoFinal.pptx",
  // },

  // {
  //   category: "projetos",
  //   course: "ic",
  //   title: "Relatório Consolidado das Avaliações com Utilizadores (Grupo)",
  //   desc: "",
  //   date: "2025-11-16",
  //   tags: ["relatorio"],
  //   file: "assets/projetos/IC/IC-T12-G19-RelatorioConsolidadoAvaliacoes (1).pdf",
  // },

  // //-----PCO
  // {
  //   category: "projetos",
  //   course: "pco",
  //   title: "Enunciado do Projeto de PCO 25/26",
  //   desc: "",
  //   date: "2025-11-16",
  //   tags: ["relatorio"],
  //   group: "Projeto Final",
  //   file: "assets/projetos/PCO/TrabPCO-Corrigido-13Nov.pdf",
  // },

  // {
  //   category: "projetos",
  //   course: "pco",
  //   title: "Ficheiros dado pela Professora",
  //   desc: "",
  //   date: "2025-11-16",
  //   tags: ["Código", "java"],
  //   file: "assets/projetos/PCO/ProjetoAlunos (4).zip",
  // },
  //   {
  //   category: "projetos",
  //   course: "pco",
  //   title: "Projeto final",
  //   desc: "Ficheiros que eram para fazer de acordo com o enunciado (feito grupo de 2)",
  //   date: "2025-11-16",
  //   tags: ["Código","java"],
  //   group: "Projeto Final",
  //   file: "assets/projetos/PCO/PCO018.zip",
  // },


  //---FTV
  {
    category: "projetos",
    course: "ftv",
    title: "Enunciado - AutoCAD",
    desc: "",
    date: "2025-11-16",
    tags: ["relatório"],
    fileOpen: "https://drive.google.com/file/d/1n_76EAXVYSw3iv4R2lZqqVE6nc7AqqAX/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1n_76EAXVYSw3iv4R2lZqqVE6nc7AqqAX",

  },

  {
    category: "projetos",
    course: "ftv",
    title: "Projeto - AutoCAD",
    desc: "",
    date: "2025-11-16",
    tags: ["relatório"],
    fileOpen: "https://drive.google.com/file/d/1sbR_FYkLciOjE1dNoVFFaMhjFqGbshN-/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1sbR_FYkLciOjE1dNoVFFaMhjFqGbshN-",
    
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
    fileOpen: "https://drive.google.com/file/d/1iFj_pglAmW9EqG_c2O0BBM6MKb8SXpa2/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1iFj_pglAmW9EqG_c2O0BBM6MKb8SXpa2",
    
  },

  {
    category: "projetos",
    course: "ftv",
    title: "Enunciado - ParaView",
    desc: "",
    date: "2025-11-16",
    tags: ["relatório"],
    fileOpen: "https://drive.google.com/file/d/1xdLY2H0QOFEHDYXZ7Rdl61lTFA4Hgiml/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1xdLY2H0QOFEHDYXZ7Rdl61lTFA4Hgiml",
    
  },

  {
    category: "projetos",
    course: "ftv",
    title: "Ficheiro de Dados - ParaView",
    desc: "",
    date: "2025-11-16",
    tags: ["dados","vtk"],
    fileOpen: "https://drive.google.com/file/d/10tPR6aQltfW4hwVKOCCyIF32i6YV7gue/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=10tPR6aQltfW4hwVKOCCyIF32i6YV7gue",
    
  },


    {
    category: "projetos",
    course: "ftv",
    title: "Relatório - ParaView",
    desc: "",
    date: "2025-11-16",
    tags: ["pdf"],
    fileOpen: "https://drive.google.com/file/d/1R9KuNZW4BcmpBHhyHGfS16jOByF6Gyzp/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1R9KuNZW4BcmpBHhyHGfS16jOByF6Gyzp",
    
  },


  {
    category: "projetos",
    course: "ftv",
    title: "Projeto Final - ParaView",
    desc: "",
    date: "2025-11-16",
    tags: ["zip"],
    group: "Projeto Final",
    fileOpen: "https://drive.google.com/file/d/1s_h6z08Ei7xpgrVQ6XD_s4MtjSLLbhBA/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1s_h6z08Ei7xpgrVQ6XD_s4MtjSLLbhBA",
    
  },



  //---ASW
  {
    category: "projetos",
    course: "asw",
    title: "Enunciado - 1 Fase ",
    desc: "Enunciado do projeto de ASW: desenvolvimento de uma aplicação web com backend em Node.js, API REST, persistência de dados, integração com frontend e serviços externos, incluindo requisitos, fases (checkpoints) e práticas de engenharia como autenticação, validação e documentação.",
    date: "2025-11-16",
    tags: ["pdf", "api", "nodejs", "web app"],
    fileOpen: "https://drive.google.com/file/d/1_wIZOamH_q1aJ56O4E8jLCayBOR3b1uD/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1_wIZOamH_q1aJ56O4E8jLCayBOR3b1uD",
  },



  //---AD
  {
    category: "projetos",
    course: "ad",
    title: "Enunciado - 1 Fase ",
    desc: "Enunciado do projeto de AD 1 ",
    date: "2026-07-17",
    tags: ["pdf"],
    fileOpen: "https://drive.google.com/file/d/1_92v4nsKI6pNACbp38GE3V35j4HmZMXl/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1_92v4nsKI6pNACbp38GE3V35j4HmZMXl",
  },
 
  {
    category: "projetos",
    course: "ad",
    title: "Enunciado - 2 Fase ",
    desc: "Enunciado do projeto de AD 2",
    date: "2026-07-17",
    tags: ["pdf"],
    fileOpen: "https://drive.google.com/file/d/1W5-gZILGTr8NKsx_SwkkYKxXfDdaIzxe/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1W5-gZILGTr8NKsx_SwkkYKxXfDdaIzxe",
  },


  {
    category: "projetos",
    course: "ad",
    title: "Enunciado - 3 Fase ",
    desc: "Enunciado do projeto de AD 3",
    date: "2026-07-17",
    tags: ["pdf"],
    fileOpen: "https://drive.google.com/file/d/1_92v4nsKI6pNACbp38GE3V35j4HmZMXl/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1_92v4nsKI6pNACbp38GE3V35j4HmZMXl",
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
    fileOpen: "https://drive.google.com/file/d/15lyXEJuPsS9BaTaUD274R-bYLNa3suQH/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=15lyXEJuPsS9BaTaUD274R-bYLNa3suQH",
    
  },

  {
    category: "exercicios",
    course: "bd",
    title: "Resolução Exame Modelo",
    desc: "Resolução dos Exercícios do Exame Modelo 2025/2026",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    fileOpen: "https://drive.google.com/file/d/1m-xZynAXXTiNF6n7WMmjaqVPpvmWFKN_/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1m-xZynAXXTiNF6n7WMmjaqVPpvmWFKN_",
  },

  //------IC
  {
    category: "exercicios",
    course: "ic",
    title: "Exercícios - 2º teste",
    desc: "Avaliação com Utilizadores, Princípios de design, Desenho de páginas Web, Avaliação Heurística, Desenho de Ecrãs",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    fileOpen: "https://drive.google.com/file/d/13bj-ferk3sWf_1DSf_Lhqe4zZRICF6yc/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=13bj-ferk3sWf_1DSf_Lhqe4zZRICF6yc",
    
  },



  //------FTV
  {
    category: "exercicios",
    course: "ftv",
    title: "Enunciado dos Exercícios de Exame",
    desc: "Enunciado dos Exercícios de Exame / sem respodas",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    fileOpen: "https://drive.google.com/file/d/1adg3hncBz1_-fkFG7NEwzELLhVXS5JOR/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1adg3hncBz1_-fkFG7NEwzELLhVXS5JOR",
    

  },

  {
    category: "exercicios",
    course: "ftv",
    title: "Exercícios de Exame",
    desc: "Resolução dos Exercícios de Exame (do enunciado/docs)",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    fileOpen: "https://drive.google.com/file/d/1PiEqoHpKt-9cDnu0nnS5MDPnJTTcmADl/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1PiEqoHpKt-9cDnu0nnS5MDPnJTTcmADl",

  },

  {
    category: "exercicios",
    course: "ftv",
    title: "Exercícios de Exame (F/V)",
    desc: "Resolução dos Exercícios de Exame (F/V) com explicação",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    fileOpen: "https://drive.google.com/file/d/1Pv7_80Ux0HSp7EdDOFLmQX8duzf9rNO7/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1Pv7_80Ux0HSp7EdDOFLmQX8duzf9rNO7",
    
  },

 //------SO
  {
    category: "exercicios",
    course: "so",
    title: "Resolução dos Exercícios Moodle",
    desc: "Resolução dos Exercícios Moodle anos anteriores",
    date: "2025-02-25",
    tags: ["Exame","Exercicios"],
    fileOpen: "https://drive.google.com/file/d/1MhHfIry77UF1vRLvMjVesT7NzshLVkMr/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1MhHfIry77UF1vRLvMjVesT7NzshLVkMr",
    
  },

 //------PCO


 //------SI

  {
    category: "exercicios",
    course: "si",
    title: "Paradigma do Espaço de Estados - Formulação de Problemas",
    desc: "Enunciado e Resolucao de alguns exercicos- ficha 1",
    date: "2025-02-25",
    tags: [],
    fileOpen: "https://drive.google.com/drive/folders/19SEmwmu1lhv1zDjCqRGvW5lvBEteA1jb",
    fileDownload: "https://drive.google.com/drive/folders/19SEmwmu1lhv1zDjCqRGvW5lvBEteA1jb",
  },

  {
    category: "exercicios",
    course: "si",
    title: "Algoritmos de Procura: Procura não informada em árvore.",
    desc: "Enunciado e Resolucao de alguns exercicos- ficha 2",
    date: "2025-02-25",
    tags: [],
    fileOpen: "https://drive.google.com/drive/folders/1NLwkVxdRP27XQCD6GGYnlTs1rl9-L-61",
    fileDownload: "https://drive.google.com/drive/folders/1NLwkVxdRP27XQCD6GGYnlTs1rl9-L-61",
  },

  {
    category: "exercicios",
    course: "si",
    title: "Algoritmos de Procura: Procura não informada em grafo",
    desc: "Enunciado e Resolucao de alguns exercicos- ficha 3",
    date: "2025-02-25",
    tags: [],
    fileOpen: "https://drive.google.com/drive/folders/1pFn_33UWRp70m-V2msXcjtAUvFRFmdAZ",
    fileDownload: "https://drive.google.com/drive/folders/1pFn_33UWRp70m-V2msXcjtAUvFRFmdAZ",
  },

  {
    category: "exercicios",
    course: "si",
    title: "Algoritmos de Procura Informada: Greedy e A* em árvore e em grafo.",
    desc: "Enunciado e Resolucao de alguns exercicos- ficha 4",
    date: "2025-02-25",
    tags: [],
    fileOpen: "https://drive.google.com/drive/folders/1fz5ce2Lpf6F6cSHlFQTVSPlgKZfHXV6q",
    fileDownload: "https://drive.google.com/drive/folders/1fz5ce2Lpf6F6cSHlFQTVSPlgKZfHXV6q",
  },


  {
    category: "exercicios",
    course: "si",
    title: "Exercícios de procura com adversário: algoritmos minimax e alfabeta",
    desc: "Enunciado e Resolucao de alguns exercicos- ficha 5",
    date: "2025-02-25",
    tags: [],
    fileOpen: "https://drive.google.com/drive/folders/1AEWiPHftUTuM5DWaNpadAHWMR_9MwXla",
    fileDownload: "https://drive.google.com/drive/folders/1AEWiPHftUTuM5DWaNpadAHWMR_9MwXla",
  },

  {
    category: "exercicios",
    course: "si",
    title: "Exercícios sobre algoritmos de Procura Local e Global",
    desc: "Enunciado e Resolucao de alguns exercicos- ficha 6",
    date: "2025-02-25",
    tags: [],
    fileOpen: "https://drive.google.com/drive/folders/1XuhK23Lg3JzNc513fA1LEiAFK-7rq8-8",
    fileDownload: "https://drive.google.com/drive/folders/1XuhK23Lg3JzNc513fA1LEiAFK-7rq8-8",

  },

  {
    category: "exercicios",
    course: "si",
    title: "Exercícios sobre formulação de Problemas de Satisfação de Restrições",
    desc: "Enunciado e Resolucao de alguns exercicos- ficha 7",
    date: "2025-02-25",
    tags: [],
    fileOpen: "https://drive.google.com/drive/folders/1HIMxG8ZX6RpS1WhqdlczzGTrycJtGYcX",
    fileDownload: "https://drive.google.com/drive/folders/1HIMxG8ZX6RpS1WhqdlczzGTrycJtGYcX",
  },

  {
    category: "exercicios",
    course: "si",
    title: "Exercícios de resolução de Problemas de Satisfação de Restrições",
    desc: "Enunciado e Resolucao de alguns exercicos- ficha 8",
    date: "2025-02-25",
    tags: [],
    fileOpen: "https://drive.google.com/drive/folders/1Azh-J5Ch5x_sTpBif3SmvjLHwE8dJqmv",
    fileDownload: "https://drive.google.com/drive/folders/1Azh-J5Ch5x_sTpBif3SmvjLHwE8dJqmv",

  },


  {
    category: "exercicios",
    course: "si",
    title: "Exame 1 epoca 24/25",
    desc: "",
    date: "2026-07-19",
    tags: [],
    fileOpen: "https://drive.google.com/file/d/1Pftrm8NrYKz7WayzOrgKwNp3TjOxgEM9/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1Pftrm8NrYKz7WayzOrgKwNp3TjOxgEM9",
  },


  {
    category: "exercicios",
    course: "si",
    title: "Exame 2 epoca 24/25",
    desc: "",
    date: "2026-07-19",
    tags: [],
    fileOpen: "https://drive.google.com/file/d/1fFajOrMJlyI47Frwo3O8DDIF7pwjQ6PU/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1fFajOrMJlyI47Frwo3O8DDIF7pwjQ6PU",
  },


  {
    category: "exercicios",
    course: "si",
    title: "Exame 1 epoca 25/26",
    desc: "",
    date: "2026-07-19",
    tags: [],
    fileOpen: "https://drive.google.com/file/d/1QkLxAOv3zQC5Vu1jHlkkDbX5ri5nZa5v/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1QkLxAOv3zQC5Vu1jHlkkDbX5ri5nZa5v",
  },


  {
    category: "exercicios",
    course: "si",
    title: "Exame 2 epoca 25/26",
    desc: "",
    date: "2026-07-19",
    tags: [],
    fileOpen: "https://drive.google.com/file/d/1hJfg6fUVi6OTxNQEWRbSBbmU3lagJg1C/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1hJfg6fUVi6OTxNQEWRbSBbmU3lagJg1C",
  },


  //------AD

  {
    category: "exercicios",
    course: "ad",
    title: "Exercicios de Exame anos anteriores (importante)",
    desc: "exercicios que apareceram nos exames, importante pois sao sempre iguais/parecidos",
    date: "2025-02-27",
    tags: ["Exercicios","Exame"],
    fileOpen: "https://drive.google.com/file/d/1K6hg3IlFPq46dS63MCQY1PObEYvb-00W/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1K6hg3IlFPq46dS63MCQY1PObEYvb-00W",
  },


  {
    category: "exercicios",
    course: "ad",
    title: "Exercicios de ad (aulas etc/quiz)",
    desc: "Exercicios feitos nas aulas",
    date: "2025-02-27",
    tags: ["Exercicios", "Aulas"],
    fileOpen: "https://drive.google.com/file/d/1H79-uaRiSJOMo1AADcZUFeFBf-XywK4S/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1H79-uaRiSJOMo1AADcZUFeFBf-XywK4S",
  },


  //------ASW


  {
    category: "exercicios",
    course: "asw",
    title: "Quiz de preparacao (aula)",
    desc: "",
    date: "2026-07-17",
    tags: ["Exercicios",],
    fileOpen: "https://drive.google.com/file/d/1WDWTeCGWyBrSPHgo9FwMzkWqeycdMDkP/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1WDWTeCGWyBrSPHgo9FwMzkWqeycdMDkP",
  },

  {
    category: "exercicios",
    course: "asw",
    title: "Perguntas para exame",
    desc: "",
    date: "2026-07-17",
    tags: ["Exercicios"],
    fileOpen: "https://drive.google.com/file/d/19NwIEpjFke3dRy4pc2jpVNOkIqfQLD0H/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=19NwIEpjFke3dRy4pc2jpVNOkIqfQLD0H",
  },

  //------ADS
  {
    category: "exercicios",
    course: "ads",
    title: "Exame tipo 25/26",
    desc: "",
    date: "2026-07-17",
    tags: ["Exame","tipo"],
    fileOpen: "https://drive.google.com/file/d/1YTmtRbPbnwRBbxTYZEjWdp6Rlay3WwNN/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1YTmtRbPbnwRBbxTYZEjWdp6Rlay3WwNN",
  },


  {
    category: "exercicios",
    course: "ads",
    title: "Resolucao do exame tipo (feito pelo professor) 25/26",
    desc: "",
    date: "2026-07-17",
    tags: ["Exame","tipo","resolucao"],
    fileOpen: "https://drive.google.com/file/d/1yiEt2XKibsP69u5Rb2-vnShmYlSYqca5/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1yiEt2XKibsP69u5Rb2-vnShmYlSYqca5",
  },


  {
    category: "exercicios",
    course: "ads",
    title: "Exame 1 epoca 25/26",
    desc: "",
    date: "2026-07-17",
    tags: ["Exame", "1poca"],
    fileOpen: "https://drive.google.com/file/d/1TBGhprCKO4zA7eW9x_9t7KhQOu3ZVjDC/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1TBGhprCKO4zA7eW9x_9t7KhQOu3ZVjDC",
  },

  {
    category: "exercicios",
    course: "ads",
    title: "Exame 2 epoca 25/26",
    desc: "",
    date: "2026-07-17",
    tags: ["Exame", "2epoca"],
    fileOpen: "https://drive.google.com/file/d/1GO8NomPr9zuzHiw0H1PKGucWJlMsmwh_/view",
    fileDownload: "https://drive.google.com/uc?export=download&id=1GO8NomPr9zuzHiw0H1PKGucWJlMsmwh_",
  },


];


if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    COURSES,
    ITEMS
  };
}