import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentForm from "../../componenets/CommentForm/CommentForm";
import { useUserContext } from "../../../../shared/userContext/userContext";
import { updateComment } from "../../api/auth";
const Post = () => {
	const [post, setPost] = useState();
	const [editing, setEditing] = useState();
	const { id } = useParams();
	const { user } = useUserContext();
	const navigate = useNavigate();
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

	const handleSumbit = async (e) => {
		e.preventDefault();

		e.preventDefault();
		const comment = document.querySelector(`[data-id="${editing}"]`).value;
		if (comment.trim().length > 0) {
			const res = await updateComment(editing, comment);
			if (res.status === 200) {
				navigate(0);
			}
		}
	};

	return (
		<>
			<h1>{post?.title}</h1>
			<span dangerouslySetInnerHTML={{ __html: post?.content }} />
			<CommentForm />
			<h2>{post?.comments.length} Comments</h2>
			{post?.comments.map((comment) => {
				return (
					<>
						{editing === comment.id ? (
							<form onSubmit={handleSumbit}>
								<input data-id={comment.id} defaultValue={comment.content}></input>
								<button type="submit">Save</button>
								<button
									onClick={() => {
										setEditing();
									}}
								>
									Cancel
								</button>
							</form>
						) : (
							<div>
								<h4>{comment.content}</h4>
								<p>{comment.author.username}</p>
								{comment.authorId === user.id ? (
									<button
										onClick={() => {
											setEditing(comment.id);
										}}
									>
										Edit
									</button>
								) : (
									<></>
								)}
							</div>
						)}
					</>
				);
			})}
		</>
	);
};

export default Post;
