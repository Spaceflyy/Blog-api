import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { newComment, deleteComment } from "../../api/auth";
import { useUserContext } from "../../../../shared/userContext/userContext";
import CommentEditor from "../CommentEditor/CommentEditor";

const Comment = ({ comment, editingId, setEditingId, updatePostCommments }) => {
	const { user } = useUserContext();
	const [viewReplying, setViewReplying] = useState(false);

	const [replying, setReplying] = useState();

	const isEditing = editingId === comment.id;
	const navigate = useNavigate();

	const handleDelete = async (commentId) => {
		const res = await deleteComment(commentId);
		if (res.status === 200) {
			navigate(0);
		}
	};

	const handleReply = async (e) => {
		e.preventDefault();
		const commentInput = document.getElementById("reply");
		if (commentInput.value.trim().length > 0) {
			await newComment(null, user.id, commentInput.value, replying);
		}
		setReplying();
	};

	return (
		<article>
			<h4>{comment.author.username}</h4>
			<h3>{comment.created_at}</h3>
			{isEditing ? (
				<CommentEditor
					updatePostCommments={updatePostCommments}
					comment={comment}
					setEditingId={setEditingId}
				/>
			) : (
				<p>{comment.content}</p>
			)}

			{replying === comment.id ? (
				<>
					<input type="text" id="reply" placeholder="Write a reply..." />
					<button onClick={handleReply}>Reply</button>
					<button
						onClick={() => {
							setReplying();
						}}>
						Close
					</button>
				</>
			) : (
				<>
					<Link
						onClick={() => {
							setReplying(comment.id);
						}}>
						Reply
					</Link>
					{comment.authorId === user?.id && (
						<>
							<button
								onClick={() => {
									setEditingId(comment.id);
								}}>
								Edit
							</button>
							<button
								onClick={() => {
									handleDelete(comment.id);
								}}>
								Delete
							</button>
						</>
					)}
				</>
			)}

			{comment.replies?.length > 0 && viewReplying === false ? (
				<Link
					onClick={() => {
						setViewReplying(true);
					}}>
					View {comment.replies?.length} replies
				</Link>
			) : (
				comment.replies?.map((reply) => {
					return (
						<Comment
							key={reply.id}
							comment={reply}
							editingId={editingId}
							setEditingId={setEditingId}
							updatePostCommments={updatePostCommments}
						/>
					);
				})
			)}
		</article>
	);
};

export default Comment;
