import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

const saltRounds = 10;

// GET a list of all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// POST a new user via registration
router.post("/", async (req, res) => {
	try {
		const { email, password, confirmPassword } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "Email and password required" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords must match" });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters long" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ message: "Email already registered" });
		}

		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const user = new User({ email, password: hashedPassword });
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRATION,
		});

		await user.save();

		res.status(201).json({ message: "Registration successful", token });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// GET a user's settings
router.get("/data", authenticate, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) return res.status(404).json({ message: "User not found" });

		res.json(user.preferences);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET a single preference by key
router.get("/data/:key", authenticate, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) return res.status(404).json({ message: "User not found" });

		res.json({ [req.params.key]: user.preferences[req.params.key] });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// POST a singular user preference to update
router.post("/data/:key", authenticate, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) return res.status(404).json({ message: "User not found" });

		const { [req.params.key]: newValue } = req.body;

		user.preferences[req.params.key] = newValue;

		await user.save();

		res.json({ message: "Preference updated successfully" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post("/data", authenticate, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) return res.status(404).json({ message: "User not found" });

		const newPrefs = req.body;
		user.preferences = { ...user.preferences, ...newPrefs };

		await user.save();
		res.json({ message: "Preferences saved successfully" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

export default router;
