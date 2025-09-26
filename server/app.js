import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";

import User from "./models/User.js";

dotenv.config();

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

const preloadUsers = async () => {
	const count = await User.countDocuments();
	if (count === 0) {
		await User.insertMany([
			{ email: "alice@example.com", password: "password1" },
			{ email: "bob@example.com", password: "password2" },
			{ email: "charlie@example.com", password: "password3" },
		]);
	}
};

const run = async () => {
	await connectDB();
	await preloadUsers();
	app.listen(port, () => console.log(`Server running on port ${port}`));
};

run();
