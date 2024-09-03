const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDb = require("./db/db");
const usersRoute = require("./routers/auth.route");

// initialize the app
const app = express();

const port = process.env.PORT || 7000;

// middlewares
app.use(cors());
app.use(express.json());

app.use("/auth", usersRoute);

const startServer = async () => {
  try {
    await connectDb(process.env.DB_URI);
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
