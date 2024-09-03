const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

// initialize the app
const app = express();

const port = process.env.PORT || 7000;

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
