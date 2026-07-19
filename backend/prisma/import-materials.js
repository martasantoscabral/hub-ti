require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const data1 = require("../../frontend/data1.js");
const data2 = require("../../frontend/data2.js");

if (!process.env.DATABASE_URL) {
  throw new Error("A variável DATABASE_URL não está definida.");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const CATEGORY_MAP = {
  resumos: "RESUMO",
  projetos: "PROJETO",
  exercicios: "EXERCICIO"
};

function normalizeDate(value) {
  if (!value) {
    return null;
  }

  const parts = value.split("-");

  if (parts.length !== 3) {
    return null;
  }

  const [year, month, day] = parts;

  const normalized = [
    year,
    month.padStart(2, "0"),
    day.padStart(2, "0")
  ].join("-");

  const date = new Date(`${normalized}T00:00:00.000Z`);

  return Number.isNaN(date.getTime()) ? null : date;
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .map(tag => String(tag).trim())
    .filter(Boolean);
}

function getOpenUrl(item) {
  return item.open || item.fileOpen || item.file || null;
}

function getDownloadUrl(item) {
  return item.download || item.fileDownload || item.file || null;
}

async function importItems(items, yearNumber) {
  const academicYear = await prisma.academicYear.findUnique({
    where: {
      number: yearNumber
    }
  });

  if (!academicYear) {
    throw new Error(`O ${yearNumber}.º ano não foi encontrado.`);
  }

  let imported = 0;
  let ignored = 0;

  for (const item of items) {
    if (
      !item.course ||
      !item.title ||
      !CATEGORY_MAP[item.category]
    ) {
      ignored++;
      continue;
    }

    const course = await prisma.course.findFirst({
      where: {
        code: item.course,
        academicYearId: academicYear.id
      }
    });

    if (!course) {
      console.warn(
        `Disciplina ignorada: ${item.course} — ${item.title}`
      );

      ignored++;
      continue;
    }

    const sourceKey = [
      yearNumber,
      item.course,
      item.category,
      slugify(item.title)
    ].join("-");

    const materialData = {
      sourceKey,
      title: String(item.title).trim(),
      description: item.desc
        ? String(item.desc).trim()
        : null,
      category: CATEGORY_MAP[item.category],
      materialDate: normalizeDate(item.date),
      openUrl: getOpenUrl(item),
      downloadUrl: getDownloadUrl(item),
      tags: cleanTags(item.tags),
      courseId: course.id
    };

    await prisma.material.upsert({
      where: {
        sourceKey
      },
      update: materialData,
      create: materialData
    });

    imported++;
  }

  return {
    imported,
    ignored
  };
}

async function main() {
  const result1 = await importItems(data1.ITEMS, 1);
  const result2 = await importItems(data2.ITEMS, 2);

  console.log("Importação concluída.");
  console.log("1.º ano:", result1);
  console.log("2.º ano:", result2);
}

main()
  .catch(error => {
    console.error("Erro na importação:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });