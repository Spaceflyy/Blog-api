export const refresh = async () => {
	return await fetch("http://localhost:3000/auth/token", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	}).then(async function (response) {
		return { response: await response.json(), status: response.status };
	});
};

export const login = async (user) => {
	return await fetch("http://localhost:3000/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ email: user.email, password: user.password }),
	}).then(async function (response) {
		const data = await response.json();
		return { user: data.user, status: response.status };
	});
};

export const logout = async () => {
	return await fetch("http://localhost:3000/auth/logout", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	}).then(async function (response) {
		return { status: response.status };
	});
};

export const newUser = async (user) => {
	const { email, firstname, lastname, username, password, isAuthor } = user;
	return await fetch("http://localhost:3000/users/sign-up", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({
			email,
			firstname,
			lastname,
			username,
			password,
			isAuthor,
		}),
	}).then(async function (response) {
		return { status: response.status };
	});
};

export const newComment = async (postId, authorId, content) => {
	return await fetch(`http://localhost:3000/posts/${postId}/comments/new`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({
			content,
			authorId,
		}),
	}).then(async function (response) {
		return { status: response.status };
	});
};
