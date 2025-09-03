export const createPost = async (authorId, title, content) => {
	return await fetch("http://localhost:3000/posts/new", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({
			authorId,
			title,
			content,
		}),
	}).then(async function (response) {
		return { status: response.status };
	});
};

export const deletePost = async (postId) => {
	return await fetch(`http://localhost:3000/posts/delete/${postId}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	}).then(async function (response) {
		return { status: response.status };
	});
};

export const editPost = async (postId, newTitle, newContent) => {
	return await fetch(`http://localhost:3000/posts/edit/${postId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ title: newTitle, content: newContent }),
	}).then(async function (response) {
		return { status: response.status };
	});
};

export const getAllPosts = async () => {};

export const getUserPosts = async (userId) => {};
