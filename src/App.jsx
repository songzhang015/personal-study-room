import "./App.css";
import RoomTitle from "./components/RoomTitle";
import Settings from "./components/Settings/Settings";
import Pomodoro from "./components/Pomodoro";
import Tasks from "./components/Tasks";
import Room from "./components/Room";
import bellOne from "./assets/bell-one.mp3";
import bellTwo from "./assets/bell-two.mp3";
import birds from "./assets/birds.mp3";
import notification from "./assets/notification.mp3";
import lofiGuitar from "./assets/lofi-guitar.mp3";
import { useState, useRef, useEffect } from "react";
import { useStorage } from "./components/Storage.jsx";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const storedToken = localStorage.getItem("jwt");
		if (storedToken) {
			setToken(storedToken);
			setIsLoggedIn(true);
		}
	}, []);

	const [pomoTimer, setPomoTimer] = useStorage(
		"pomoTimer",
		25,
		isLoggedIn,
		token
	);
	const [shortTimer, setShortTimer] = useStorage(
		"shortTimer",
		5,
		isLoggedIn,
		token
	);
	const [longTimer, setLongTimer] = useStorage(
		"longTimer",
		20,
		isLoggedIn,
		token
	);

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
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
				setToken={setToken}
			/>
			<Pomodoro
				pomoTimer={pomoTimer}
				shortTimer={shortTimer}
				longTimer={longTimer}
				timerSound={timerSound}
				playTimerSound={playTimerSound}
				title={title}
				token={token}
			/>
			<Tasks isLoggedIn={isLoggedIn} token={token} />
			<Room />
			<audio ref={audioRef} preload="auto" />
		</div>
	);
}

export default App;
