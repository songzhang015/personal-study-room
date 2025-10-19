import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	roomCode: { type: String, required: true },
	preferences: {
		pomoTimer: { type: Number, default: 25 },
		shortTimer: { type: Number, default: 5 },
		longTimer: { type: Number, default: 20 },
		tasks: {
			type: [
				{
					id: Number,
					text: String,
					checked: Boolean,
					isEditing: Boolean,
				},
			],
			default: [],
		},
		roomTitle: { type: String, default: "Personal Study Room" },
		alarmVolume: { type: Number, default: 0.5 },
		alarmSelection: { type: String, default: "bellOne" },
	},
});

const User = mongoose.model("User", userSchema);

export default User;
