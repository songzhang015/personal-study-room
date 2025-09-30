import "../styles/Tasks.css";
import { useState } from "react";
import editIcon from "../assets/edit-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";

function Tasks({ tasks, setTasks }) {
	const [viewMode, setViewMode] = useState("minimized"); // minimized, expanded

	const toggleTask = (id) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, checked: !task.checked } : task
		);
		setTasks(updatedTasks);
	};

	const deleteTask = (id) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
	};

	const startEditing = (id) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, isEditing: true } : task
		);
		setTasks(updatedTasks);
	};

	const saveTask = (id, newText) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, text: newText, isEditing: false } : task
		);
		setTasks(updatedTasks);
	};

	const [newTaskName, setNewTaskName] = useState("");
	const createTask = (taskName) => {
		if (!taskName.trim()) return;

		const newTask = {
			id: Date.now(),
			text: taskName,
			checked: false,
			isEditing: false,
		};

		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);
	};

	const [addingTask, setAddingTask] = useState(false);

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
							{tasks.map((task) => (
								<div key={task.id} className="task-container">
									<div className="left-section">
										<div
											className={`circle ${task.checked ? "checked" : ""}`}
											onClick={() => toggleTask(task.id)}
										></div>
										{task.isEditing ? (
											<input
												type="text"
												defaultValue={task.text}
												autoFocus
												onBlur={(e) => {
													if (e.target.value.trim() === "") {
														e.target.focus();
													} else {
														saveTask(task.id, e.target.value);
													}
												}}
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														if (e.target.value.trim() !== "") {
															saveTask(task.id, e.target.value);
														} else {
															e.preventDefault();
														}
													}
												}}
												className="task-input"
											/>
										) : (
											<p
												className={`task ${task.checked ? "task-checked" : ""}`}
												onClick={() => toggleTask(task.id)}
											>
												{task.text}
											</p>
										)}
									</div>

									<div className="task-btns">
										<img
											src={editIcon}
											alt="Edit"
											className="task-icon"
											onClick={() => startEditing(task.id)}
										/>
										<img
											src={deleteIcon}
											alt="Delete"
											className="task-icon"
											onClick={() => deleteTask(task.id)}
										/>
									</div>
								</div>
							))}
						</div>
						<div className="divider"></div>

						{addingTask ? (
							<div className="add-task-row">
								<input
									type="text"
									value={newTaskName}
									onChange={(e) => setNewTaskName(e.target.value)}
								/>

								<button
									onClick={() => {
										createTask(newTaskName);
										setNewTaskName("");
										setAddingTask(false);
									}}
								>
									Save
								</button>
								<button
									onClick={() => {
										setNewTaskName("");
										setAddingTask(false);
									}}
								>
									Cancel
								</button>
							</div>
						) : (
							<button
								className="add-task-btn"
								onClick={() => setAddingTask(true)}
							>
								+ Add Task
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Tasks;
