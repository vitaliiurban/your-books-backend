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
  const searchQuery = req.query.searchQuery;
  const skip = (page - 1) * limit;
  console.log(searchQuery);
  let baseFilter = {};
  if (parseInt(searchQuery)) {
    baseFilter = { genres: parseInt(searchQuery) };
  } else if (searchQuery !== "undefined") {
    baseFilter.OR = [
      { title: { contains: searchQuery } },
      { author: { contains: searchQuery } },
      { publisher: { contains: searchQuery } },
    ];
  }

  const data = await prisma.books.findMany({
    skip: skip,
    take: limit,
    where: baseFilter,
  });
  console.log(baseFilter);
  res.json(data);
});

module.exports = router;
