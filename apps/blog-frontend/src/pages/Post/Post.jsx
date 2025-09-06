import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newComment } from "../../api/auth";
import { useUserContext } from "../../../../shared/userContext/userContext";
const Post = () => {
	const [post, setPost] = useState();
	const [comment, setComment] = useState();
	const navigate = useNavigate();
	const { user } = useUserContext();
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await newComment(post.id, user.id, comment);

		if (res.status === 200) {
			navigate(0);
		}
	};
	return (
		<>
			<h1>{post?.title}</h1>
			<span dangerouslySetInnerHTML={{ __html: post?.content }} />
			<form method="POST" onSubmit={handleSubmit}>
				<label htmlFor="leaveComment"></label>
				<textarea
					onChange={(e) => {
						setComment(e.target.value);
					}}
					name="leaveComment"
					id="leaveComment"
					placeholder="Leave a Comment..."
					value={comment}
				></textarea>
				<button>Add Comment</button>
			</form>

			<h2>{post?.comments.length} Comments</h2>
			{post?.comments.map((comment) => {
				return (
					<div>
						<h4>{comment.content}</h4>
						<p>{comment.author.username}</p>
					</div>
				);
			})}
		</>
	);
};

export default Post;
