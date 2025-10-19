function Sounds({
	timerSound,
	setTimerSound,
	playTimerSound,
	soundOptions,
	alarmVolume,
	setAlarmVolume,
}) {
	return (
		<>
			<h2>Alarm Sound:</h2>
			<select
				value={timerSound}
				onChange={(e) => {
					const newSound = e.target.value;
					setTimerSound(newSound);
					playTimerSound(newSound);
				}}
			>
				{soundOptions.map((option, idx) => (
					<option key={idx} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<h2>Alert Volume:</h2>
			<input
				className="volume-input"
				type="range"
				min="0"
				max="1"
				step="0.1"
				value={alarmVolume}
				onChange={(e) => setAlarmVolume(Number(e.target.value))}
				onMouseUp={(e) =>
					playTimerSound(timerSound, Number(e.currentTarget.value))
				}
				onTouchEnd={(e) =>
					playTimerSound(timerSound, Number(e.currentTarget.value))
				}
			/>
			<p>{alarmVolume * 10}</p>
		</>
	);
}

export default Sounds;
