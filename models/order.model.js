import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
		quantity: { type: Number, required: true },
		totalPrice: { type: Number, required: true },
		status: {
			type: String,
			enum: ["paid", "pending", "shipping", "received"],
			default: "pending",
		},
		reference: { type: String },
	},
	{ timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
