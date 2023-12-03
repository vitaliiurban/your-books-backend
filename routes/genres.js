const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const data = await prisma.genres.findUnique({
      where: { id },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
