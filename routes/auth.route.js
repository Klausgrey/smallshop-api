import { register, login } from "../controlers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import express from "express"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)


export default router