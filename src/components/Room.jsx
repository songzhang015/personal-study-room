import "../styles/Room.css";

function Room({ token }) {
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
			<button
				className="room-btn"
				onClick={async () => {
					if (token) {
						const code = await lookupCode();
						console.log(code);
					}
				}}
			>
				Room
			</button>
		</div>
	);
}

export default Room;
