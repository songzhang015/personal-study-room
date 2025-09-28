import "../../styles/Settings.css";
import settingsIcon from "../../assets/settings-icon.svg";
import General from "./General";
import Timers from "./Timers";
import Sounds from "./Sounds";
import Account from "./Account";
import { useState } from "react";

function Settings({
	pomoTimer,
	shortTimer,
	longTimer,
	setPomoTimer,
	setShortTimer,
	setLongTimer,
	soundOptions,
	timerSound,
	setTimerSound,
	playTimerSound,
	alarmVolume,
	setAlarmVolume,
	isLoggedIn,
	setIsLoggedIn,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const openMenu = () => {
		setIsOpen(true);
		setActiveTab("General");
		setAccountAction("login");
	};
	const closeMenu = () => setIsOpen(false);

	const tabs = ["General", "Timers", "Sounds", "Account"];
	const [activeTab, setActiveTab] = useState("General");

	const [accountAction, setAccountAction] = useState("login"); // Login, register

	return (
		<div className="settings">
			<h1 className="settings-btn" onClick={openMenu}>
				<img src={settingsIcon} alt="Settings icon" className="settings-icon" />
				Settings
			</h1>

			<div
				className={`screen-overlay ${isOpen ? "visible" : ""}`}
				onClick={closeMenu}
			></div>

			<div className={`settings-menu ${isOpen ? "visible" : ""}`}>
				<div className="tabs">
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={activeTab === tab ? "active" : ""}
						>
							{tab}
						</button>
					))}
				</div>

				<div className="content">
					{activeTab === "General" ? (
						<General />
					) : activeTab === "Timers" ? (
						<Timers
							pomoTimer={pomoTimer}
							shortTimer={shortTimer}
							longTimer={longTimer}
							setPomoTimer={setPomoTimer}
							setShortTimer={setShortTimer}
							setLongTimer={setLongTimer}
							closeMenu={closeMenu}
						/>
					) : activeTab === "Sounds" ? (
						<Sounds
							timerSound={timerSound}
							setTimerSound={setTimerSound}
							playTimerSound={playTimerSound}
							soundOptions={soundOptions}
							alarmVolume={alarmVolume}
							setAlarmVolume={setAlarmVolume}
						/>
					) : activeTab === "Account" ? (
						<Account
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
							accountAction={accountAction}
							setAccountAction={setAccountAction}
							setPomoTimer={setPomoTimer}
							setShortTimer={setShortTimer}
							setLongTimer={setLongTimer}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Settings;
