export const refresh = async () => {
	const response = await fetch("http://localhost:3000/auth/token", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	}).then(async function (response) {
		return { response: await response.json(), status: response.status };
	});
	console.log(response);
};

export const login = async (user) => {
	return await fetch("http://localhost:3000/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ username: user.username, password: user.password }),
	}).then(async function (response) {
		return { response: await response.json(), status: response.status };
	});
};
