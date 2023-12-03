const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
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

router.put("/update-reserved", async (req, res) => {
  const id = req.body.book_id;
  const value = parseInt(req.body.value);
  try {
    const update = await prisma.books.update({
      where: { id },
      data: {
        reserved: value,
      },
    });

    res.json(update);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

module.exports = router;
