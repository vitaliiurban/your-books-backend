const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = 3000;

const exampleExample = require("./routes/exampleExample");
const authentication = require("./routes/authentication");
const user = require("./routes/user");
const books = require("./routes/books");
async function main() {
  // app.use("/api/example", exampleExample);
  app.use(express.json());
  app.use("/api/books", books);
  app.use("/api/authentication", authentication);
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
