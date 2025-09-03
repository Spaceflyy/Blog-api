import PostEditor from "../components/PostEditor/PostEditor";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editPost } from "../../api/postApi";
const EditPost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

	const handleTitleChange = () => {
		let newTitle = document.getElementById("title").value;
		setTitle(newTitle);
	};

	const handleEditorChange = (newContent) => {
		setContent(newContent);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await editPost(id, title, content);

		if (res.status === 200) {
			navigate("/");
		}
	};

	useEffect(() => {
		(async () => {
			try {
				let res = await fetch(`http://localhost:3000/posts/${id}`, {
					method: "GET",
					credentials: "include",
				});

				if (res.status === 200) {
					const post = await res.json();
					setTitle(post.title);
					setContent(post.content);
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="title">Title:</label>
			<input
				value={title}
				onChange={handleTitleChange}
				id="title"
				type="text"
				name="title"
			/>
			<PostEditor handleEditorChange={handleEditorChange} content={content} />
			<button type="submit">Save</button>
		</form>
	);
};

export default EditPost;
