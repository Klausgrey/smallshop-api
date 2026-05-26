import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String },
		category: { type: String },
		stock: { type: Number },
		isAvailable: { type: Boolean, default: false },
		image: { url: String, publicId: String },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
