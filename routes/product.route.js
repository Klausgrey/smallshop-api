import { verifyToken } from "../middleware/auth.middleware.js";
import { isOwner } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import express from "express";
import { create } from "../controlers/product.controller.js";

const router = express.Router();

router.post("/products", verifyToken, isOwner, upload.single("image"), create);

export default router;
