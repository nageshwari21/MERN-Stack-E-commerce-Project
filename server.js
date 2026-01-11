import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

// Load env
dotenv.config();
connectDB();

const app = express();

/* ================================
   FIX __dirname FOR ES MODULE
================================ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================================
   DISABLE CACHE (Avoid 304 errors)
================================ */
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

/* ================================
   MIDDLEWARE
================================ */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* ================================
   API ROUTES
================================ */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

/* ================================
   SERVE REACT BUILD
================================ */
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

/* ================================
   START SERVER
================================ */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
