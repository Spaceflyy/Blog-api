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

export const newComment = async (
	postId,
	authorId,
	content,
	parentCommentId,
) => {
	return await fetch(`http://localhost:3000/posts/${postId}/comments/new`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({
			authorId,
			content,
			parentCommentId,
		}),
	}).then(async function (response) {
		return { status: response.status, comment: await response.json() };
	});
};

export const updateComment = async (commentId, content) => {
	return await fetch(
		`http://localhost:3000/posts/comments/update/${commentId}`,
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				content,
			}),
		},
	).then(async function (response) {
		return { status: response.status };
	});
};

export const deleteComment = async (commentId) => {
	return await fetch(
		`http://localhost:3000/posts/comments/delete/${commentId}`,
		{
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		},
	).then(async function (response) {
		return { status: response.status };
	});
};

//get comments by parentid then map those to the comments whos id matches the comments parent id
//when show replies is clicked get the replies to show x replies on each comment

// export const addCommentReply = async (commentId, content) => {
// 	return (await fetch(
// 		`htttp://localhost:3000/posts/comments/reply/${commentId}`
// 	),
// 	{
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		credentials: "include",
// 		body: JSON.stringify({ content }),
// 	}).then(async function (response) {
// 		return { status: response.status };
// 	});
// };
