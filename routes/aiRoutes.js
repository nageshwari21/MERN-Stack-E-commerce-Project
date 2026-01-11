import express from "express";
import { recommendProducts } from "../controllers/aiRecommendController.js";

const router = express.Router();

router.post("/recommend", recommendProducts);

export default router;   // 👈 THIS WAS MISSING
