const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const data = await prisma.books.findUnique({
      where: { id },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
