import Product from "../models/product.model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const create = async (req, res, next) => {
	const { name, price, description, category, stock, isAvailable } = req.body;
	const ownerId = req.user.id;

	try {
		const uploadResult = await uploadToCloudinary(req.file.buffer);
		const image = {
			url: uploadResult.secure_url,
			publicId: uploadResult.public_id,
		};

		const product = await Product.create({
			name,
			price,
			description,
			category,
			stock,
			isAvailable,
			image,
			createdBy: ownerId,
		});
		res.status(201).json({ product });
	} catch (err) {
		next(err);
	}
};

export const getAll = async (req, res, next) => {
	const sort = req.query.sort || "createdAt";
	const order = req.query.order === "desc" ? "desc" : "asc";
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	try {
		const filter = {};
		if (req.query.category) filter.category = req.query.category;
		if (req.query.isAvailable)
			filter.isAvailable = req.query.isAvailable === "true";

		const result = await Product.find(filter)
			.sort({ [sort]: order })
			.limit(limit)
			.skip(skip);
		const total = await Product.countDocuments(filter);
		res.status(200).json({ total, page, limit, result });
	} catch (err) {
		next(err);
	}
};
export const getById = async (req, res, next) => {
	const productId = req.params.id;
	try {
		const match = await Product.findById(productId);
		if (!match) return res.status(404).json({ message: "id not found" });
		res.status(200).json({
			match,
		});
	} catch (err) {
		next(err);
	}
};

export const UpdateById = async (req, res, next) => {
	const productId = req.params.id;
	try {
		const match = await Product.findById(productId);
		if (!match) return res.status(404).json({ message: "id not found" });

		const result = await Product.findByIdAndUpdate(
			productId,
			{ $set: req.body },
			{ new: true },
		);
		res.status(200).json({ result });
	} catch (err) {
		next(err);
	}
};
export const deleteById = async (req, res, next) => {
	const productId = req.params.id;
	try {
		const match = await Product.findById(productId);
		if (!match) return res.status(404).json({ message: "id not found" });

		const result = await Product.findByIdAndDelete(productId);
		res.status(200).json({ message: "item deleted successfully" });
	} catch (err) {
		next(err);
	}
};
