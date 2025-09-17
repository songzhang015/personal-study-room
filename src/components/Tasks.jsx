import "../styles/Tasks.css";
import { useState } from "react";

function Tasks() {
	const [viewMode, setViewMode] = useState("minimized"); // minimized, expanded

	return (
		<div className="tasks">
			<div
				className={`taskbar ${viewMode}`}
				onClick={
					viewMode === "minimized" ? () => setViewMode("expanded") : undefined
				}
			>
				{viewMode === "minimized" && <h2>Tasks</h2>}

				{viewMode === "expanded" && (
					<>
						<div className="row" onClick={() => setViewMode("minimized")}>
							<h2>Tasks</h2>
							{viewMode === "expanded" && <p className="minimize-btn">˅</p>}
						</div>
						<div className="divider"></div>
						<div className="task-items">
							<p className="task">Task 1</p>
							<p className="task">Task 2</p>
						</div>
						<div className="divider"></div>
					</>
				)}
			</div>
		</div>
	);
}

export default Tasks;
