function Timers({
	pomoTimer,
	shortTimer,
	longTimer,
	setPomoTimer,
	setShortTimer,
	setLongTimer,
	closeMenu,
}) {
	return (
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
	);
}

export default Timers;
