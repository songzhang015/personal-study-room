import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
	roomCode: { type: String, required: true, unique: true },
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Code = mongoose.model("Code", codeSchema);

export default Code;
