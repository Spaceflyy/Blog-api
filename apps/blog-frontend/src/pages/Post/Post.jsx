import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
	const [post, setPost] = useState();
	const { id } = useParams();
	useEffect(() => {
		(async () => {
			try {
				let res = await fetch(`http://localhost:3000/posts/${id}`, {
					method: "GET",
					credentials: "include",
				});

				if (res.status === 200) {
					setPost(await res.json());
				}
			} catch (error) {
				console.error(error);
				setPost();
			}
		})();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<h1>{post?.title}</h1>
			<span dangerouslySetInnerHTML={{ __html: post?.content }} />
			<form method="POST" onSubmit={handleSubmit}>
				<label htmlFor="leaveComment"></label>
				<textarea
					name="leaveComment"
					id="leaveComment"
					placeholder="Leave a Comment..."
				></textarea>
			</form>

			<h2>{post?.comments.length} Comments</h2>
			{/* map Comments */}
		</>
	);
};

export default Post;
