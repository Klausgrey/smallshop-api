import express from "express";
import authRoute from "./routes/auth.route.js";
import errorHandler from "./middleware/error.middleware.js";
import connectDB from "./config/db.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoute);
app.use(errorHandler);
connectDB();

export default app;
