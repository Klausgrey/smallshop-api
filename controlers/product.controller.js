import Product from "../models/product.model.js";

export const create = async (req, res, next) => {
	const { name, price, description, category, stock, isAvailable, image } =
		req.body;
	const ownerId = req.user.id

	try {
		await Product.create({
			name,
			price,
			description,
			category,
			stock,
			isAvailable,
			image,
			createdBy:ownerId
		});
		res.status(20).json({ message: "created successfully" });
	} catch (err) {
		next(err);
	}
};
