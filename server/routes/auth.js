import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// POST a login request with email and password
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRATION,
		});
		res.status(200).json({ message: "Login successful", token });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

export default router;
