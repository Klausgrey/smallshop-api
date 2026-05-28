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
