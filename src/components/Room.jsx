import "../styles/Room.css";
import { useState } from "react";

function Room({ token }) {
	const [viewMode, setViewMode] = useState("minimized"); // minimized, expanded

	const lookupCode = async () => {
		if (token) {
			try {
				const res = await fetch("http://localhost:3000/users/data/code", {
					headers: { Authorization: `Bearer ${token}` },
				});
				const prefs = await res.json();
				return prefs.roomCode;
			} catch (err) {
				console.log(err.message);
			}
		}
	};

	return (
		<div className="room">
			<div
				className={`room-btn ${viewMode}`}
				onClick={
					viewMode === "minimized" ? () => setViewMode("expanded") : undefined
				}
			>
				{viewMode === "minimized" && <h2>Room</h2>}

				{viewMode === "expanded" && (
					<>
						<div className="row" onClick={() => setViewMode("minimized")}>
							<h2>Room</h2>
							{viewMode === "expanded" && <p className="minimize-btn">˅</p>}
						</div>
						<div className="divider"></div>
					</>
				)}
			</div>
		</div>
	);
}

export default Room;
