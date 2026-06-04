import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { sendEmail } from "../config/email.js";

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
		try {
			await sendEmail({
				to: req.user.email,
				subject: "Order Confirmed - SmallShop",
				text: `Hi ${req.user.username}, your order has been recieved. Total amount is ${userOrder.totalPrice}. Status ${userOrder.status}`,
			});
		} catch (emailErr) {
			console.log("Email failure", emailErr.message);
		}
		await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });
		res.status(201).json(userOrder);
	} catch (err) {
		next(err);
	}
};

export const getOrders = async (req, res, next) => {
	const userId = req.user.id;
	const filter = req.user.role === "owner" ? {} : { userId };
	try {
		const orders = await Order.find(filter);
		res.status(200).json({ orders });
	} catch (err) {
		next(err);
	}
};
