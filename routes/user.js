const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await prisma.users.delete({
      where: { id: req.params.id },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/update/pass/:id", async (req, res) => {
  try {
    const { id, oldPassword, password } = req.body;
    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (user.password !== oldPassword) {
      return res.status(404).json({ error: "Old password not match" });
    }
    const updatedUser = await prisma.users.update({
      where: { id: id },
      data: {
        password: password,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const { id, username, email } = req.body;
    const updatedUser = await prisma.users.update({
      where: { id: id },
      data: {
        username: username,
        email: email,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
