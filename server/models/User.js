import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	preferences: {
		pomoTimer: { type: Number, default: 25 },
		shortTimer: { type: Number, default: 5 },
		longTimer: { type: Number, default: 20 },
	},
});

const User = mongoose.model("User", userSchema);

export default User;
