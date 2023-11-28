const express = require("express");
const router = express.Router();
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  try {
    // code here
  } catch (error) {
    res.status(500).json(500);
  }
});
