import pkg from "jsonwebtoken";
const { verify } = pkg;
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
	const auth = req.headers.authorization;
	if (!auth) return res.status(401).json({ message: "No token provided" });

	const token = auth.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Invalid token format" });

	try {
		const decoded = verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		next(err);
	}
};

export const isOwner = (req, res, next) => {
	const user = req.user.role;

	if (user === "owner") {
		next();
	} else res.status(403).json({ message: "Access denied" });
};
