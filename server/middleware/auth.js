import jwt from "jsonwebtoken";

// Authenticates JWT token
const authenticate = (req, res, next) => {
	const authHeader = req.header("authorization");
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) return res.sendStatus(401);

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = decoded;
		next();
	} catch (err) {
		res.sendStatus(403).json({ message: err.message });
	}
};

export default authenticate;
