import express from "express";
import { sendOutOfStockAlert } from "../controllers/NotificationController.js";

const router = express.Router();

router.post("/out-of-stock", sendOutOfStockAlert);

export default router;
