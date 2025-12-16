import express from "express";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.cyan.white);
});
