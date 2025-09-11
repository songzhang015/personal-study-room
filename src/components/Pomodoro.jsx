import "../styles/Pomodoro.css";

function Pomodoro() {
	return (
		<div className="pomodoro">
			<div className="btn-wrapper">
				<button>pomodoro</button>
				<button>short break</button>
				<button>long break</button>
			</div>
			<h1 className="timer"> 1:30:00</h1>
			<button className="start-btn">start</button>
		</div>
	);
}

export default Pomodoro;
