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

export const getAllPosts = async () => {};

export const getUserPosts = async (userId) => {};
