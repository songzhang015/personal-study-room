import "../styles/Room.css";
import { useState, useEffect } from "react";

function Room({ token }) {
	const [viewMode, setViewMode] = useState("minimized"); // minimized, expanded
	const [roomCode, setRoomCode] = useState("");

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

	useEffect(() => {
		if (!token) return;

		const fetchCode = async () => {
			const code = await lookupCode();
			setRoomCode(code || "");
		};

		fetchCode();
	}, [token]);

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
						<p className="room-code-title">Room Code</p>
						<p>{roomCode}</p>
						<div className="room-btn-group">
							<button>Join</button>
							<button>Chat</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Room;
