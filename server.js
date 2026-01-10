import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* =========================
   DISABLE API CACHING (304 FIX)
========================= */
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* =========================
   ROUTES
========================= */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
