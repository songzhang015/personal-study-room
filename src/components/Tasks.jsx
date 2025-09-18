import "../styles/Tasks.css";
import { useState } from "react";
import { useLocalStorage } from "./localStorage.jsx";
import editIcon from "../assets/edit-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";

function Tasks() {
	const [viewMode, setViewMode] = useState("minimized"); // minimized, expanded
	const [tasks, setTasks] = useLocalStorage("tasks", [
		{ id: 1, text: "Task 1", checked: false, isEditing: false },
		{ id: 2, text: "Task 2", checked: false, isEditing: false },
	]);

	const toggleTask = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, checked: !task.checked } : task
			)
		);
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const startEditing = (id) => {
		setTasks((prev) =>
			prev.map((task) => (task.id === id ? { ...task, isEditing: true } : task))
		);
	};

	const saveTask = (id, newText) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, text: newText, isEditing: false } : task
			)
		);
	};

	const [newTaskName, setNewTaskName] = useState("");
	const createTask = (taskName) => {
		if (!taskName.trim()) return;

		setTasks((prev) => [
			...prev,
			{
				id: prev.length + 1,
				text: taskName,
				checked: false,
				isEditing: false,
			},
		]);
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
