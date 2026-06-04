import { verifyToken, isOwner } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import express from "express";
import {
	create,
	getAll,
	getById,
	UpdateById,
	deleteById,
} from "../controlers/product.controller.js";

const router = express.Router();

router.post("/products", verifyToken, isOwner, upload.single("image"), create);
router.get("/products", getAll);
router.get("/products/:id", verifyToken, getById);
router.put("/products/:id", verifyToken, isOwner, UpdateById);
router.delete("/products/:id", verifyToken, isOwner, deleteById);

export default router;
