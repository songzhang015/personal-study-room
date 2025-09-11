import "../styles/Settings.css";
import settingsIcon from "../assets/settings-icon.svg";

function Settings() {
	return (
		<div className="settings">
			<h1 className="open-settings">
				<img src={settingsIcon} alt="Settings icon" className="settings-icon" />
				Settings
			</h1>
		</div>
	);
}

export default Settings;
