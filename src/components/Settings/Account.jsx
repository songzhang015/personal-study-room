import { useState } from "react";

function Account({
	isLoggedIn,
	setIsLoggedIn,
	accountAction,
	setAccountAction,
	setPomoTimer,
	setShortTimer,
	setLongTimer,
	setToken,
}) {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("");

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: loginEmail, password: loginPassword }),
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("jwt", data.token);
				setToken(data.token);
				setIsLoggedIn(true);

				window.location.reload();
				console.log("SUCCESS");
			} else {
				console.log("INVALID");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:3000/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: registerEmail,
					password: registerPassword,
					confirmPassword: confirmRegisterPassword,
				}),
			});

			if (response.ok) {
				const data = await response.json();

				localStorage.setItem("jwt", data.token);
				setToken(data.token);
				setIsLoggedIn(true);

				const keys = [
					"pomoTimer",
					"shortTimer",
					"longTimer",
					"tasks",
					"roomTitle",
					"alarmVolume",
					"alarmSelection",
				];
				for (const key of keys) {
					const stored = localStorage.getItem(key);
					if (stored !== null) {
						await fetch(`http://localhost:3000/users/data/${key}`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${data.token}`,
							},
							body: JSON.stringify({ [key]: JSON.parse(stored) }),
						});
						localStorage.removeItem(key);
					}
				}
				window.location.reload();
				console.log("SUCCESS");
			} else {
				console.log("INVALID");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleLogOut = async (e) => {
		e.preventDefault();
		try {
			setIsLoggedIn(false);
			localStorage.removeItem("jwt");

			localStorage.removeItem("pomoTimer");
			localStorage.removeItem("shortTimer");
			localStorage.removeItem("longTimer");
			localStorage.removeItem("tasks");
			localStorage.removeItem("roomTitle");
			localStorage.removeItem("alarmVolume");
			localStorage.removeItem("alarmSelection");

			window.location.reload();
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className="account-section">
			{isLoggedIn ? (
				<>
					<h1>You are logged in.</h1>
					<button onClick={handleLogOut}>Log out</button>
				</>
			) : accountAction === "login" ? (
				<>
					<form className="account-login" onSubmit={handleLoginSubmit}>
						<div className="form-group">
							<label htmlFor="login-email">Email</label>
							<input
								type="text"
								id="login-email"
								value={loginEmail}
								onChange={(e) => setLoginEmail(e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="login-password">Password</label>
							<input
								type="password"
								id="login-password"
								value={loginPassword}
								onChange={(e) => setLoginPassword(e.target.value)}
							/>
						</div>

						<button type="submit" className="submit-btn">
							Log in
						</button>
					</form>
					<p>
						Don't have an account?{" "}
						<span
							onClick={() => {
								setAccountAction("register");
								setLoginEmail("");
								setLoginPassword("");
							}}
						>
							Register
						</span>
						.
					</p>
				</>
			) : (
				<>
					<form className="account-register" onSubmit={handleRegisterSubmit}>
						<div className="form-group">
							<label htmlFor="register-email">Email</label>
							<input
								type="text"
								id="register-email"
								value={registerEmail}
								onChange={(e) => setRegisterEmail(e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="register-password">Password</label>
							<input
								type="password"
								id="register-password"
								value={registerPassword}
								onChange={(e) => setRegisterPassword(e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="register-confirm-password">
								Confirm Password
							</label>
							<input
								type="password"
								id="register-confirm-password"
								value={confirmRegisterPassword}
								onChange={(e) => setConfirmRegisterPassword(e.target.value)}
							/>
						</div>

						<button type="submit" className="submit-btn">
							Register
						</button>
					</form>
					<p>
						Already have an account?{" "}
						<span
							onClick={() => {
								setAccountAction("login");
								setRegisterEmail("");
								setRegisterPassword("");
								setConfirmRegisterPassword("");
							}}
						>
							Log in
						</span>
						.
					</p>
				</>
			)}
		</div>
	);
}

export default Account;
