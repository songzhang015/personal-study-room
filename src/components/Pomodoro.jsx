import "../styles/Pomodoro.css";
import { useTimer } from "react-timer-hook";

const expiryTimestamp = new Date();
expiryTimestamp.setHours(expiryTimestamp.getHours() + 1);
expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 30);

function Pomodoro() {
	const { seconds, minutes, hours, isRunning, pause, restart, resume } =
		useTimer({
			expiryTimestamp,
			onExpire: () => alert("Time's up!"),
			autoStart: false,
		});

	const resetPomodoro = () => {
		const newExpiry = new Date();
		newExpiry.setHours(newExpiry.getHours() + 1);
		newExpiry.setMinutes(newExpiry.getMinutes() + 30);
		restart(newExpiry);
		pause();
	};

	const shortBreak = () => {
		const newExpiry = new Date();
		newExpiry.setMinutes(newExpiry.getMinutes() + 5);
		restart(newExpiry);
		pause();
	};

	const longBreak = () => {
		const newExpiry = new Date();
		newExpiry.setMinutes(newExpiry.getMinutes() + 20);
		restart(newExpiry);
		pause();
	};
	return (
		<div className="pomodoro">
			<div className="btn-wrapper">
				<button onClick={resetPomodoro}>pomodoro</button>
				<button onClick={shortBreak}>short break</button>
				<button onClick={longBreak}>long break</button>
			</div>
			<h1 className="timer">
				{hours}:{minutes.toString().padStart(2, "0")}:
				{seconds.toString().padStart(2, "0")}
			</h1>
			{!isRunning && (
				<button className="start-btn" onClick={resume}>
					start
				</button>
			)}
			{isRunning && (
				<button className="start-btn" onClick={pause}>
					pause
				</button>
			)}
		</div>
	);
}

export default Pomodoro;
