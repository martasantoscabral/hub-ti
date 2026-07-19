const express = require("express");
const prisma = require("../lib/prisma");
const requireAdmin = require("../middleware/admin.middleware");

const router = express.Router();

router.get("/:courseCode/materials", async (req, res) => {
  try {
    const courseCode = req.params.courseCode.toLowerCase();

    const category = req.query.category
      ? String(req.query.category).toUpperCase()
      : undefined;

    const validCategories = [
      "RESUMO",
      "PROJETO",
      "EXERCICIO"
    ];

    if (
      category !== undefined &&
      !validCategories.includes(category)
    ) {
      return res.status(400).json({
        error:
          "A categoria deve ser RESUMO, PROJETO, EXERCICIO ou EXAME."
      });
    }

    const materials = await prisma.material.findMany({
      where: {
        course: {
          code: courseCode
        },

        ...(category && {
          category
        })
      },

      include: {
        course: {
          select: {
            id: true,
            code: true,
            name: true,
            semester: true
          }
        }
      },

      orderBy: [
        {
          materialDate: "desc"
        },
        {
          title: "asc"
        }
      ]
    });

    res.json(materials);
  } catch (error) {
    console.error("Erro ao procurar materiais:", error);

    res.status(500).json({
      error: "Não foi possível carregar os materiais."
    });
  }
});





router.post("/", requireAdmin, async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      semester,
      color,
      academicYearId
    } = req.body;

    if (!code || !name || !semester || !academicYearId) {
      return res.status(400).json({
        error:
          "code, name, semester e academicYearId são obrigatórios."
      });
    }

    const parsedSemester = Number(semester);
    const parsedAcademicYearId = Number(academicYearId);

    if (![1, 2].includes(parsedSemester)) {
      return res.status(400).json({
        error: "O semestre deve ser 1 ou 2."
      });
    }

    if (
      !Number.isInteger(parsedAcademicYearId) ||
      parsedAcademicYearId <= 0
    ) {
      return res.status(400).json({
        error: "O ano selecionado não é válido."
      });
    }

    const academicYear =
      await prisma.academicYear.findUnique({
        where: {
          id: parsedAcademicYearId
        }
      });

    if (!academicYear) {
      return res.status(404).json({
        error: "O ano académico não foi encontrado."
      });
    }

    const course = await prisma.course.create({
      data: {
        code: String(code).trim().toLowerCase(),
        name: String(name).trim(),

        description: description
          ? String(description).trim()
          : null,

        semester: parsedSemester,

        color: color
          ? String(color).trim()
          : null,

        academicYearId: parsedAcademicYearId
      }
    });

    return res.status(201).json(course);
  } catch (error) {
    console.error("Erro ao criar disciplina:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error:
          "Já existe uma disciplina com esse código nesse ano."
      });
    }

    return res.status(500).json({
      error: "Não foi possível criar a disciplina."
    });
  }
});


module.exports = router;