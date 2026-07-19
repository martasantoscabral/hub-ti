const express = require("express");
const prisma = require("../lib/prisma");

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
      "EXERCICIO",
      "EXAME"
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

module.exports = router;