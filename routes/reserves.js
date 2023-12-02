const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const book_id = req.body.book_id;
    const user_id = req.body.user_id;
    console.log(book_id, user_id);
    const data = await prisma.reserves.create({
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

module.exports = router;
