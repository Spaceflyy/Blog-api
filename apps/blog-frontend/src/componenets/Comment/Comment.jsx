import { Link } from "react-router-dom";
import { useState } from "react";
import { newComment } from "../../api/auth";
import { useUserContext } from "../../../../shared/userContext/userContext";
import CommentEditor from "../CommentEditor/CommentEditor";
import ReplyForm from "../ReplyForm/ReplyForm";
import CommentButtons from "../CommentButtons/CommentButtons";

const Comment = ({
	comment,
	editingId,
	setEditingId,
	setReplyingId,
	replyingId,
	updatePostComments,
	removeComment,
}) => {
	const { user } = useUserContext();
	const [viewReplying, setViewReplying] = useState(false);

	const [replying, setReplying] = useState();

	const isEditing = editingId === comment.id;
	const isReplying = replyingId === comment.id;

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
					updatePostComments={updatePostComments}
					comment={comment}
					setEditingId={setEditingId}
				/>
			) : (
				<p>{comment.content}</p>
			)}
			{isReplying ? (
				<ReplyForm setReplyingId={setReplyingId} handleReply={handleReply} />
			) : (
				<CommentButtons
					setReplyingId={setReplyingId}
					setEditingId={setEditingId}
					comment={comment}
					removeComment={removeComment}
				/>
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
							setReplyingId={setReplyingId}
							replyingId={replyingId}
							updatePostComments={updatePostComments}
							removeComment={removeComment}
						/>
					);
				})
			)}
		</article>
	);
};

export default Comment;
