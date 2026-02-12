import { useCommentContext } from "../../../../shared/commentContext/CommentContext";
import CommentEditor from "../CommentEditor/CommentEditor";
import ReplyForm from "../ReplyForm/ReplyForm";
import CommentButtons from "../CommentButtons/CommentButtons";
import CommentReplies from "../CommentReplies/CommentReplies";

const Comment = ({ postId, comment }) => {
	const { editingId, replyingId } = useCommentContext();
	const isEditing = editingId === comment.id;
	const isReplying = replyingId === comment.id;

	return (
		<article>
			<h4>{comment.author.username}</h4>
			<h3>{comment.created_at}</h3>

			{isEditing ? <CommentEditor comment={comment} /> : <p>{comment.content}</p>}

			{isReplying ? (
				<ReplyForm postId={postId} />
			) : (
				<CommentButtons comment={comment} />
			)}

			<CommentReplies comment={comment} postId={postId} />
		</article>
	);
};

export default Comment;
