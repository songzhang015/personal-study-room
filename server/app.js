import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/users", usersRouter);
app.use("/auth", authRouter);

const seed = async () => {
	const count = await User.countDocuments();
	if (count === 0) {
		const saltRounds = 10;

		const users = [
			{
				email: "alice@example.com",
				password: await bcrypt.hash("password1", saltRounds),
				preferences: {
					pomoTimer: 25,
					shortTimer: 5,
					longTimer: 20,
					tasks: [],
					roomTitle: "Alice's Room",
				},
			},
			{
				email: "bob@example.com",
				password: await bcrypt.hash("password2", saltRounds),
				preferences: {
					pomoTimer: 25,
					shortTimer: 5,
					longTimer: 20,
					tasks: [],
					roomTitle: "Bob's Room",
				},
			},
			{
				email: "charlie@example.com",
				password: await bcrypt.hash("password3", saltRounds),
				preferences: {
					pomoTimer: 25,
					shortTimer: 5,
					longTimer: 20,
					tasks: [],
					roomTitle: "Charlie's Room",
				},
			},
		];
		await User.insertMany(users);
	}
};

const run = async () => {
	await connectDB();
	//await User.deleteMany();
	await seed();
	app.listen(port, () => console.log(`Server running on port ${port}`));
};

run();
