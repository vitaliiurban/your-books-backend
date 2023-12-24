const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
router.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const newBook = await prisma.books.create({
      data: {
        ...req.body,
        year: parseInt(req.body.year),
        in_stock: parseInt(req.body.in_stock),
        reserved: parseInt(req.body.reserved),
        genres: parseInt(req.body.genres),
        rating: parseInt(req.body.rating),
        id: uuidv4().substring(0, 8),
      },
    });
    res.json(newBook);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});
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
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBook = await prisma.books.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedBook);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const deletedBook = await prisma.books.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
        year: parseInt(req.body.year),
        in_stock: parseInt(req.body.in_stock),
        reserved: parseInt(req.body.reserved),
        genres: parseInt(req.body.genres),
        rating: parseInt(req.body.rating),
      },
    });
    res.json(deletedBook);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

module.exports = router;
