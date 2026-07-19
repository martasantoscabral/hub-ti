const express = require("express");
const prisma = require("../lib/prisma");
const requireAdmin = require("../middleware/admin.middleware");

const router = express.Router();

const VALID_CATEGORIES = [
  "RESUMO",
  "PROJETO",
  "EXERCICIO"
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
          "A categoria deve ser RESUMO, PROJETO ou EXERCICIO."
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




router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const materialId = Number(req.params.id);

    if (!Number.isInteger(materialId) || materialId <= 0) {
      return res.status(400).json({
        error: "O identificador do material não é válido."
      });
    }

    const material = await prisma.material.findUnique({
      where: {
        id: materialId
      }
    });

    if (!material) {
      return res.status(404).json({
        error: "O material não foi encontrado."
      });
    }

    await prisma.material.delete({
      where: {
        id: materialId
      }
    });

    res.json({
      message: "Material eliminado com sucesso."
    });
  } catch (error) {
    console.error("Erro ao eliminar material:", error);

    res.status(500).json({
      error: "Não foi possível eliminar o material."
    });
  }
});



router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const materialId = Number(req.params.id);
    if (!Number.isInteger(materialId) || materialId <= 0) {
      return res.status(400).json({
        error: "O identificador do material não é válido."
      });
    }
    const existingMaterial = await prisma.material.findUnique({
      where: {
        id: materialId
      }
    });
    if (!existingMaterial) {
      return res.status(404).json({
        error: "O material não foi encontrado."
      });
    }
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
    const validCategories = [
      "RESUMO",
      "PROJETO",
      "EXERCICIO"
    ];
    if (!title || !title.trim()) {
      return res.status(400).json({
        error: "O título é obrigatório."
      });
    }
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error:
          "A categoria deve ser RESUMO, PROJETO ou EXERCICIO."
      });
    }
    const parsedCourseId = Number(courseId);
    if (
      !Number.isInteger(parsedCourseId) ||
      parsedCourseId <= 0
    ) {
      return res.status(400).json({
        error: "A disciplina selecionada não é válida."
      });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: parsedCourseId
      }
    });

    if (!course) {
      return res.status(404).json({
        error: "A disciplina não foi encontrada."
      });
    }

    let parsedMaterialDate = null;

    if (materialDate) {
      parsedMaterialDate = new Date(
        `${materialDate}T00:00:00.000Z`
      );

      if (Number.isNaN(parsedMaterialDate.getTime())) {
        return res.status(400).json({
          error: "A data do material não é válida."
        });
      }
    }

    const updatedMaterial = await prisma.material.update({
      where: {
        id: materialId
      },

      data: {
        sourceKey:
          sourceKey?.trim() || existingMaterial.sourceKey,
        title: title.trim(),
        description:
          description?.trim() || null,
        category,
        materialDate: parsedMaterialDate,
        openUrl:
          openUrl?.trim() || null,
        downloadUrl:
          downloadUrl?.trim() || null,
        tags: Array.isArray(tags)
          ? tags
              .map(tag => String(tag).trim())
              .filter(Boolean)
          : [],
        courseId: parsedCourseId
      }
    });

    return res.json(updatedMaterial);
  } catch (error) {
    console.error("Erro ao editar material:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error:
          "Já existe um material com este título e categoria."
      });
    }

    return res.status(500).json({
      error: "Não foi possível editar o material."
    });
  }
});



module.exports = router;