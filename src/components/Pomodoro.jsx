import "../styles/Pomodoro.css";
import { useTimer } from "react-timer-hook";
import { useEffect } from "react";
import { useLocalStorage } from "./localStorage.jsx";

function Pomodoro({ pomoTimer, shortTimer, longTimer, playTimerSound, title }) {
	const expiryTimestamp = new Date();
	expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + pomoTimer);

	const { seconds, minutes, hours, isRunning, pause, restart, resume } =
		useTimer({
			expiryTimestamp,
			onExpire: () => {
				playTimerSound();
				setIteration((prev) => prev + 1);
				iteration % 4 === 0 ? longBreak() : shortBreak();
			},
			autoStart: false,
		});

	const resetPomodoro = () => {
		const newExpiry = new Date();
		newExpiry.setMinutes(newExpiry.getMinutes() + pomoTimer);
		restart(newExpiry);
		pause();
	};

	const shortBreak = () => {
		const newExpiry = new Date();
		newExpiry.setMinutes(newExpiry.getMinutes() + shortTimer);
		restart(newExpiry);
		pause();
	};

	const longBreak = () => {
		const newExpiry = new Date();
		newExpiry.setMinutes(newExpiry.getMinutes() + longTimer);
		restart(newExpiry);
		pause();
	};

	useEffect(() => {
		document.title = `${`${hours > 0 ? hours + ":" : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`} | ${title}`;
	}, [hours, minutes, seconds, title]);

	const [iteration, setIteration] = useLocalStorage("iteration", 1);

	return (
		<div className="pomodoro">
			<div className="btn-wrapper">
				<button onClick={resetPomodoro}>pomodoro</button>
				<button onClick={shortBreak}>short break</button>
				<button onClick={longBreak}>long break</button>
			</div>
			<h1 className="timer">
				{`${hours > 0 ? hours + ":" : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
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
