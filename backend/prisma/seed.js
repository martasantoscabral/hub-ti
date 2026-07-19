require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

if (!process.env.DATABASE_URL) {
  throw new Error(
    "A variável DATABASE_URL não está definida no ficheiro .env"
  );
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const firstYear = await prisma.academicYear.upsert({
    where: {
      number: 1
    },
    update: {
      title: "1.º Ano",
      description:
        "Primeiro ano da Licenciatura em Tecnologias de Informação",
      published: true
    },
    create: {
      number: 1,
      title: "1.º Ano",
      description:
        "Primeiro ano da Licenciatura em Tecnologias de Informação",
      published: true
    }
  });

  const secondYear = await prisma.academicYear.upsert({
    where: {
      number: 2
    },
    update: {
      title: "2.º Ano",
      description:
        "Segundo ano da Licenciatura em Tecnologias de Informação",
      published: true
    },
    create: {
      number: 2,
      title: "2.º Ano",
      description:
        "Segundo ano da Licenciatura em Tecnologias de Informação",
      published: true
    }
  });

  await prisma.academicYear.upsert({
    where: {
      number: 3
    },
    update: {
      title: "3.º Ano",
      description:
        "Terceiro ano da Licenciatura em Tecnologias de Informação",
      published: false
    },
    create: {
      number: 3,
      title: "3.º Ano",
      description:
        "Terceiro ano da Licenciatura em Tecnologias de Informação",
      published: false
    }
  });


    const courses = [
        // =========================
        // 1.º ANO — 1.º SEMESTRE
        // =========================
        {
            code: "cc",
            name: "Controvérsias Científicas",
            description: "Debates científicos e argumentação crítica.",
            semester: 1,
            color: "#7C3AED",
            academicYearId: firstYear.id
        },
        {
            code: "em1",
            name: "Elementos de Matemática I",
            description: "Álgebra, funções e cálculo diferencial.",
            semester: 1,
            color: "#D97706",
            academicYearId: firstYear.id
        },
        {
            code: "prog1",
            name: "Programação I",
            description: "Algoritmos, controlo e lógica de programação.",
            semester: 1,
            color: "#0D9488",
            academicYearId: firstYear.id
        },
        {
            code: "ac",
            name: "Arquiteturas de Computadores",
            description: "Hardware, representação binária e assembly.",
            semester: 1,
            color: "#2563EB",
            academicYearId: firstYear.id
        },

        // =========================
        // 1.º ANO — 2.º SEMESTRE
        // =========================
        {
            code: "ipe",
            name: "Introdução às Probabilidades e Estatística",
            description: "Probabilidade, distribuições e inferência estatística.",
            semester: 2,
            color: "#16A34A",
            academicYearId: firstYear.id
        },
        {
            code: "em2",
            name: "Elementos de Matemática II",
            description: "Álgebra linear, matrizes e equações diferenciais.",
            semester: 2,
            color: "#EC4899",
            academicYearId: firstYear.id
        },
        {
            code: "prog2",
            name: "Programação II",
            description: "Estruturas de dados e orientação a objetos.",
            semester: 2,
            color: "#EA580C",
            academicYearId: firstYear.id
        },
        {
            code: "rc",
            name: "Redes de Computadores",
            description: "Modelos OSI, TCP/IP e configuração de redes.",
            semester: 2,
            color: "#DC2626",
            academicYearId: firstYear.id
        },
        {
            code: "itw",
            name: "Introdução às Tecnologias Web",
            description: "HTML, CSS, JavaScript e desenvolvimento web.",
            semester: 2,
            color: "#0284C7",
            academicYearId: firstYear.id
        },

        // =========================
        // 2.º ANO — 1.º SEMESTRE
        // =========================
        {
            code: "so",
            name: "Sistema Operativo",
            description: "Processos, threads, escalonamento e memória.",
            semester: 1,
            color: "#7C3AED",
            academicYearId: secondYear.id
        },
        {
            code: "ic",
            name: "Interação com Computadores",
            description: "UX, usabilidade, prototipagem e avaliação.",
            semester: 1,
            color: "#16A34A",
            academicYearId: secondYear.id
        },
        {
            code: "pco",
            name: "Programação Centrada a Objetos",
            description: "Programação orientada a objetos, padrões e boas práticas.",
            semester: 1,
            color: "#DC2626",
            academicYearId: secondYear.id
        },
        {
            code: "ftv",
            name: "Fundamentos e Técnicas de Visualização",
            description: "Visualização e design de informação.",
            semester: 1,
            color: "#2563EB",
            academicYearId: secondYear.id
        },
        {
            code: "bd",
            name: "Bases de Dados",
            description: "Modelação relacional, normalização e SQL.",
            semester: 1,
            color: "#D97706",
            academicYearId: secondYear.id
        },

        // =========================
        // 2.º ANO — 2.º SEMESTRE
        // =========================
        {
            code: "adas",
            name: "Análise e Desenho de Aplicações e Serviços",
            description: "Requisitos, modelação e desenho de sistemas.",
            semester: 2,
            color: "#0D9488",
            academicYearId: secondYear.id
        },
        {
            code: "si",
            name: "Sistemas Inteligentes",
            description: "Inteligência artificial e algoritmos de procura.",
            semester: 2,
            color: "#EC4899",
            academicYearId: secondYear.id
        },
        {
            code: "asw",
            name: "Aplicações e Serviços na Web",
            description: "Desenvolvimento web, APIs e serviços.",
            semester: 2,
            color: "#16A34A",
            academicYearId: secondYear.id
        },
        {
            code: "ads",
            name: "Análise e Desenho de Software",
            description: "Padrões de projeto, arquitetura e qualidade de software.",
            semester: 2,
            color: "#EA580C",
            academicYearId: secondYear.id
        },
        {
            code: "ad",
            name: "Aplicações Distribuídas",
            description: "Sistemas distribuídos, comunicação e sincronização.",
            semester: 2,
            color: "#0284C7",
            academicYearId: secondYear.id
        }
    ];


  for (const course of courses) {
    await prisma.course.upsert({
      where: {
        code_academicYearId: {
          code: course.code,
          academicYearId: course.academicYearId
        }
      },
      update: {
        name: course.name,
        description: course.description,
        semester: course.semester,
        color: course.color
      },
      create: course
    });
  }

  console.log("Dados iniciais inseridos com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro ao inserir dados:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });