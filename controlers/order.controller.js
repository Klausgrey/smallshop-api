import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const createOrder = async (req, res, next) => {
	const productId = req.params.id;
	const { quantity } = req.body;
	const userId = req.user.id;

	try {
		const product = await Product.findById(productId);

		if (!product) return res.status(404).json({ message: "product not found" });
		if (product.stock < quantity)
			return res.status(400).json({ message: "Not enough stock availble" });

		const productPrice = product.price;
		const userOrder = await Order.create({
			userId,
			productId,
			quantity,
			totalPrice: productPrice * quantity,
		});
		await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });
		res.status(201).json(userOrder);
	} catch (err) {
		next(err);
	}
};

export const getOrders = async (req, res, next) => {
	const userId = req.user.id;

	try {
		const match = await Order.findById(userId);
		if (!match) return res.status(404).json({ message: "Wrong id" });

		res.status(200).json(match);
	} catch (err) {
		next(err);
	}
};
