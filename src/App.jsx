import "./App.css";
import RoomTitle from "./components/RoomTitle";
import Settings from "./components/Settings";
import Pomodoro from "./components/Pomodoro";
import Tasks from "./components/Tasks";
import Room from "./components/Room";

function App() {
	return (
		<div className="app">
			<RoomTitle />
			<Settings />
			<Pomodoro />
			<Tasks />
			<Room />
		</div>
	);
}

export default App;
