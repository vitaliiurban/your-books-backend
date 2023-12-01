const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const secretKey = "OPQJWPODJsmi1ohj";

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (user) {
      return res.status(404).json({ error: "User already exist" });
    }
    const data = await prisma.users.create({
      data: {
        id: uuidv4().substring(0, 8),
        username: username,
        email: email,
        password: password,
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password === password) {
      const token = jwt.sign({ email: user.email }, secretKey);
      user.password = undefined;
      res.status(200).json({ ...user, token });
    } else {
      res.status(401).json({ error: "Wrong password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
