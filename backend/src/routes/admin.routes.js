const express = require("express");
const requireAdmin = require("../middleware/admin.middleware");

const router = express.Router();

router.post("/verify", requireAdmin, (req, res) => {
  return res.json({
    valid: true,
    message: "Chave de administração válida."
  });
});

module.exports = router;