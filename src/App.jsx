import "./App.css";
import RoomTitle from "./components/RoomTitle";
import Settings from "./components/Settings";
import Pomodoro from "./components/pomodoro";

function App() {
	return (
		<div className="app">
			<RoomTitle />
			<Settings />
			<Pomodoro />
		</div>
	);
}

export default App;
