import { useState, useEffect } from "react";

function useStorage(key, initialValue, isLoggedIn, token) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		const fetchPreferences = async () => {
			try {
				if (isLoggedIn && token) {
					// Fetch account preferences if user is logs in
					const res = await fetch("http://localhost:3000/users/data", {
						headers: { Authorization: `Bearer ${token}` },
					});
					const prefs = await res.json();

					if (prefs[key] !== undefined) {
						setValue(prefs[key]);
					} else {
						// If no account preferences (ex. registration), migrate local data to DB instead
						await migrateLocalToDB(key, token, setValue);
					}
				} else {
					// Fetch localStorage preferences, as user is not logged in
					const stored = localStorage.getItem(key);
					if (stored !== null) {
						setValue(JSON.parse(stored));
					} else {
						setValue(initialValue);
					}
				}
			} catch (err) {
				console.log(err.message);
			}
		};

		fetchPreferences();
	}, [key, isLoggedIn, token]);

	async function migrateLocalToDB(key, token, setValue) {
		// Searches localStorage for current data, then sends data to DB and removes from localStorage
		const stored = localStorage.getItem(key);
		if (stored !== null) {
			const parsed = JSON.parse(stored);
			await fetch(`http://localhost:3000/users/data/${key}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ [key]: parsed }),
			});
			localStorage.removeItem(key);
			setValue(parsed);
		}
	}

	const saveValue = async (newValue) => {
		setValue(newValue);
		if (isLoggedIn && token) {
			console.log("SAVE: User is logged in and has a token.");
			try {
				await fetch(`http://localhost:3000/users/data/${key}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ [key]: newValue }),
				});
			} catch (err) {
				console.log(err.message);
			}
		} else {
			console.log("SAVE: User is not logged in and/or does not have a token.");
			localStorage.setItem(key, JSON.stringify(newValue));
		}
	};

	return [value, saveValue];
}

export { useStorage };
