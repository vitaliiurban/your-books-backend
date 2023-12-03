const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/check-favorite", async (req, res) => {
  const book_id = req.query.book_id;
  const user_id = req.query.user_id;
  try {
    const data = await prisma.favorites.findFirst({
      where: { book_id: book_id, user_id: user_id },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const book_id = req.body.book_id;
    const user_id = req.body.user_id;
    const data = await prisma.favorites.create({
      data: {
        book_id: book_id,
        user_id: user_id,
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await prisma.favorites.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json(deletedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
