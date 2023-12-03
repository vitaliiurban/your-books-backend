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
  const id = parseInt(req.params.id);
  const book_id = req.query.book_id;
  const user_id = req.query.user_id;
  let whereClause = {};

  if (id) {
    whereClause = { id };
  } else if (book_id && user_id) {
    whereClause = { book_id, user_id };
  } else {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  try {
    const data = await prisma.favorites.findMany({
      where: whereClause,
    });

    const deleteRecords = await prisma.favorites.deleteMany({
      where: whereClause,
    });

    res.json({ data });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
