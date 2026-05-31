import express from "express"
import { verifyToken } from "../middleware/auth.middleware.js"
import { createOrder } from "../controlers/order.controller.js"
const router = express.Router()

router.post("/orders/:id", verifyToken, createOrder)

export default router