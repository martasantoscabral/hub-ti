const express = require("express");
const prisma = require("../lib/prisma");
const requireAdmin = require("../middleware/admin.middleware");

const router = express.Router();

const VALID_CATEGORIES = [
  "RESUMO",
  "PROJETO",
  "EXERCICIO",
  "EXAME"
];

router.post("/", requireAdmin, async (req, res) => {
  try {
    const {
      sourceKey,
      title,
      description,
      category,
      materialDate,
      openUrl,
      downloadUrl,
      tags,
      courseId
    } = req.body;

    if (!sourceKey || !title || !category || !courseId) {
      return res.status(400).json({
        error:
          "sourceKey, title, category e courseId são obrigatórios."
      });
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        error:
          "A categoria deve ser RESUMO, PROJETO, EXERCICIO ou EXAME."
      });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: Number(courseId)
      }
    });

    if (!course) {
      return res.status(404).json({
        error: "A disciplina indicada não existe."
      });
    }

    const material = await prisma.material.create({
      data: {
        sourceKey: String(sourceKey).trim(),
        title: String(title).trim(),
        description: description
          ? String(description).trim()
          : null,
        category,
        materialDate: materialDate
          ? new Date(materialDate)
          : null,
        openUrl: openUrl ? String(openUrl).trim() : null,
        downloadUrl: downloadUrl
          ? String(downloadUrl).trim()
          : null,
        tags: Array.isArray(tags)
          ? tags.map(tag => String(tag).trim()).filter(Boolean)
          : [],
        courseId: Number(courseId)
      },
      include: {
        course: true
      }
    });

    res.status(201).json(material);
  } catch (error) {
    console.error("Erro ao criar material:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Já existe um material com esse sourceKey."
      });
    }

    res.status(500).json({
      error: "Não foi possível criar o material."
    });
  }
});

module.exports = router;