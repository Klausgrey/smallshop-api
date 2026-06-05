import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import User from "../models/user.model.js";

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		res
			.status(201)
			.json({ userId: user.id, username: user.username, email: user.email });
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) return res.status(400).json({ message: "Incorrect username" });

		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(400).json({ message: "Incorrect password" });

		const token = sign(
			{
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "7d" },
		);
		res.status(200).json({ token, role: user.role });
	} catch (err) {
		next(err);
	}
};
