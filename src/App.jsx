import "./App.css";
import RoomTitle from "./components/RoomTitle";
import Settings from "./components/Settings";
import Pomodoro from "./components/Pomodoro";
import Tasks from "./components/Tasks";
import Room from "./components/Room";
import bellOne from "./assets/bell-one.mp3";
import bellTwo from "./assets/bell-two.mp3";
import birds from "./assets/birds.mp3";
import notification from "./assets/notification.mp3";
import lofiGuitar from "./assets/lofi-guitar.mp3";
import { useState, useRef } from "react";
import { useLocalStorage } from "./components/localStorage.jsx";

function App() {
	const [pomoTimer, setPomoTimer] = useLocalStorage("pomoTimer", 25);
	const [shortTimer, setShortTimer] = useLocalStorage("shortTimer", 5);
	const [longTimer, setLongTimer] = useLocalStorage("longTimer", 20);

	const defaultTitle = "Personal Study Room";
	const [title, setTitle] = useState(defaultTitle);

	const soundOptions = [
		{ label: "Bell One", value: bellOne },
		{ label: "Bell Two", value: bellTwo },
		{ label: "Birds", value: birds },
		{ label: "Notification", value: notification },
		{ label: "Lofi Guitar", value: lofiGuitar },
	];

	const [timerSound, setTimerSound] = useState(bellOne);
	const [alarmVolume, setAlarmVolume] = useState(1);
	const audioRef = useRef(null);

	const playTimerSound = (sound = timerSound, volume = alarmVolume) => {
		audioRef.current.pause();
		audioRef.current.currentTime = 0;
		audioRef.current.src = sound;
		audioRef.current.volume = volume;
		audioRef.current.play();
	};

	return (
		<div className="app">
			<RoomTitle
				title={title}
				setTitle={setTitle}
				defaultTitle={defaultTitle}
			/>
			<Settings
				pomoTimer={pomoTimer}
				shortTimer={shortTimer}
				longTimer={longTimer}
				setPomoTimer={setPomoTimer}
				setShortTimer={setShortTimer}
				setLongTimer={setLongTimer}
				soundOptions={soundOptions}
				timerSound={timerSound}
				setTimerSound={setTimerSound}
				playTimerSound={playTimerSound}
				alarmVolume={alarmVolume}
				setAlarmVolume={setAlarmVolume}
			/>
			<Pomodoro
				pomoTimer={pomoTimer}
				shortTimer={shortTimer}
				longTimer={longTimer}
				timerSound={timerSound}
				playTimerSound={playTimerSound}
				title={title}
			/>
			<Tasks />
			<Room />
			<audio ref={audioRef} preload="auto" />
		</div>
	);
}

export default App;
