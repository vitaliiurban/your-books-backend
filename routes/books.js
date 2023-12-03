const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/count", async (req, res) => {
  try {
    const quantity = await prisma.books.count();
    res.json({ quantity });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;
  const data = await prisma.books.findMany({
    skip: skip,
    take: limit,
  });
  res.json(data);
});

router.get("/reserves/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const reservedBooks = await prisma.reserves.findMany({
      where: { user_id: user_id },
    });
    const bookIds = reservedBooks.map((reserve) => reserve.book_id);
    const books = await prisma.books.findMany({
      where: {
        id: {
          in: bookIds,
        },
      },
    });

    const data = res.json({ books });
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
