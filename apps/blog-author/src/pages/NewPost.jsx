import PostEditor from "../components/PostEditor/PostEditor";
import { useState } from "react";
import { useUserContext } from "../../../shared/userContext/userContext";
import { createPost } from "../../api/postApi";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const { user } = useUserContext();
	const navigate = useNavigate();
	const handleEditorChange = (newContent) => {
		setContent(newContent);
		console.log(user);
	};

	const handleTitleChange = () => {
		let newTitle = document.getElementById("title").value;
		setTitle(newTitle);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await createPost(user.id, title, content);

		if (res.status === 200) {
			navigate("/");
		}
	};
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
			<button type="submit">Save Draft</button>
			<button> Publish Post</button>
		</form>
	);
};

export default NewPost;
