import "../styles/RoomTitle.css";
import { useState } from "react";

function RoomTitle() {
	const defaultTitle = "Personal Study Room";
	const [title, setTitle] = useState(defaultTitle);
	const [isEditing, setIsEditing] = useState(false);
	const handleBlur = () => {
		let newTitle = title.replace(/^\s+/, "").replace(/\s+$/, "");
		if (newTitle.length === 0) newTitle = defaultTitle;
		setTitle(newTitle);
		setIsEditing(false);
	};

	return (
		<div className="room-title">
			{isEditing ? (
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={handleBlur}
					size={title.length}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleBlur();
						}
					}}
					autoFocus
				/>
			) : (
				<h1 onClick={() => setIsEditing(true)}>{title}</h1>
			)}
		</div>
	);
}

export default RoomTitle;
