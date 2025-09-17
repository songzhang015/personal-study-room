import "../styles/Settings.css";
import settingsIcon from "../assets/settings-icon.svg";
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
}) {
	const [isOpen, setIsOpen] = useState(false);
	const openMenu = () => {
		setIsOpen(true);
		setActiveTab("General");
	};
	const closeMenu = () => setIsOpen(false);

	const tabs = ["General", "Timers", "Sounds", "Account"];
	const [activeTab, setActiveTab] = useState("General");

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
						<>
							<h1>General Settings</h1>
							<p>For general preferences</p>
						</>
					) : activeTab === "Timers" ? (
						<>
							<div className="timer-row">
								<div className="pomo-col">
									<p>Pomodoro</p>
									<input
										type="number"
										min={1}
										value={pomoTimer}
										onChange={(e) => setPomoTimer(Number(e.target.value))}
										onKeyDown={(e) => {
											if (e.key === ".") e.preventDefault();
										}}
									></input>
									<p>min</p>
								</div>
								<div className="short-col">
									<p>Short Rest</p>
									<input
										type="number"
										min={1}
										value={shortTimer}
										onChange={(e) => setShortTimer(Number(e.target.value))}
										onKeyDown={(e) => {
											if (e.key === ".") e.preventDefault();
										}}
									></input>
									<p>min</p>
								</div>
								<div className="long-col">
									<p>Long Rest</p>
									<input
										type="number"
										min={1}
										value={longTimer}
										onChange={(e) => setLongTimer(Number(e.target.value))}
										onKeyDown={(e) => {
											if (e.key === ".") e.preventDefault();
										}}
									></input>
									<p>min</p>
								</div>
							</div>
							<div className="btn-row">
								<button
									className="reset-btn"
									onClick={() => {
										setPomoTimer(25);
										setShortTimer(5);
										setLongTimer(20);
									}}
								>
									Reset
								</button>
								<button className="save-btn" onClick={closeMenu}>
									Save
								</button>
							</div>
						</>
					) : activeTab === "Sounds" ? (
						<>
							<h2>Alarm Sound:</h2>
							<select
								value={timerSound}
								onChange={(e) => setTimerSound(e.target.value)}
							>
								{soundOptions.map((option, idx) => (
									<option key={idx} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
							<h2>Alert Volume:</h2>
							<p>Slider Here</p>
							<p>Disable timer sound: on/off</p>
						</>
					) : activeTab === "Account" ? (
						<>
							<h1>Account Settings</h1>
							<p>For account preferences</p>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Settings;
