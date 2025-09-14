import "../styles/Settings.css";
import settingsIcon from "../assets/settings-icon.svg";
import { useState } from "react";

function Settings() {
	const [isOpen, setIsOpen] = useState(false);

	const openMenu = () => setIsOpen(true);
	const closeMenu = () => setIsOpen(false);

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
					<button>General</button>
					<button>Timers</button>
					<button>Sounds</button>
					<button>Account</button>
				</div>

				<div className="content">
					<h1>I am content</h1>
					<p>I am content</p>
					<p>I am content</p>
					<p>I am content</p>
				</div>
			</div>
		</div>
	);
}

export default Settings;
