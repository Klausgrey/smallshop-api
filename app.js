import express from "express";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js";
import errorHandler from "./middleware/error.middleware.js";
import connectDB from "./config/db.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
app.use(errorHandler);
connectDB();

export default app;
