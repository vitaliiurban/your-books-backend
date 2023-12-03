const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = 3000;

const authentication = require("./routes/authentication");
const user = require("./routes/user");
const books = require("./routes/books");
const book = require("./routes/book");
const genres = require("./routes/genres");
const reserves = require("./routes/reserves");
const favorites = require("./routes/favorites");

async function main() {
  app.use(express.json());
  app.use(express.urlencoded({ limit: "100mb", extended: true }));
  app.use("/api/authentication", authentication);
  app.use("/api/books", books);
  app.use("/api/book", book);
  app.use("/api/genres", genres);
  app.use("/api/reserves", reserves);
  app.use("/api/favorites", favorites);
  app.use("/api/user", user);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
