import { Link } from "react-router-dom";
import { useUserContext } from "../../../../shared/userContext/userContext";
import { useCommentContext } from "../../../../shared/commentContext/CommentContext";
import { deleteComment } from "../../api/auth";
const CommentButtons = ({ comment }) => {
	const { user } = useUserContext();
	const { setEditingId, setReplyingId, removePostComment } = useCommentContext();
	const handleDelete = async (commentId) => {
		const res = await deleteComment(commentId);

		if (res.status === 200) {
			removePostComment(commentId);
		}
	};

	return (
		<>
			<Link
				onClick={() => {
					setReplyingId(comment.id);
					setEditingId();
				}}>
				Reply
			</Link>
			{comment.authorId === user?.id && (
				<>
					<button
						onClick={() => {
							setEditingId(comment.id);
							setReplyingId();
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
	);
};

export default CommentButtons;
