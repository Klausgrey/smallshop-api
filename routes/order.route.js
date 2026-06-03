import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { createOrder, getOrders } from "../controlers/order.controller.js";
const router = express.Router();

router.post("/orders/:id", verifyToken, createOrder);
router.get("/orders", verifyToken, getOrders);

export default router;
