const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const years = await prisma.academicYear.findMany({
      orderBy: {
        number: "asc"
      }
    });

    res.json(years);
  } catch (error) {
    console.error("Erro ao procurar anos:", error);

    res.status(500).json({
      error: "Não foi possível carregar os anos letivos."
    });
  }
});

router.get("/:yearNumber/courses", async (req, res) => {
  try {
    const yearNumber = Number(req.params.yearNumber);

    const semester = req.query.semester
      ? Number(req.query.semester)
      : undefined;

    if (!Number.isInteger(yearNumber)) {
      return res.status(400).json({
        error: "O ano indicado não é válido."
      });
    }

    if (
      semester !== undefined &&
      semester !== 1 &&
      semester !== 2
    ) {
      return res.status(400).json({
        error: "O semestre deve ser 1 ou 2."
      });
    }

    const courses = await prisma.course.findMany({
      where: {
        academicYear: {
          number: yearNumber
        },

        ...(semester !== undefined && {
          semester
        })
      },

      orderBy: [
        {
          semester: "asc"
        },
        {
          name: "asc"
        }
      ]
    });

    res.json(courses);
  } catch (error) {
    console.error("Erro ao procurar disciplinas:", error);

    res.status(500).json({
      error: "Não foi possível carregar as disciplinas."
    });
  }
});

module.exports = router;