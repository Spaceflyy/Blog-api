import { useState } from "react";
import { useUserContext } from "../../../../shared/userContext/userContext";
import { newComment } from "../../api/auth";
import { useCommentContext } from "../../../../shared/commentContext/CommentContext";

const ReplyForm = ({ postId }) => {
	const { user } = useUserContext();
	const { addPostComment, setReplyingId, replyingId } = useCommentContext();
	const [input, setInput] = useState();

	const handleReply = async (e) => {
		e.preventDefault();
		if (input.trim <= 0) {
			return;
		}

		const res = await newComment(postId, user.id, input, replyingId);
		const { comment } = res;
		comment.author = user.username;

		addPostComment(comment);
		setReplyingId(null);
	};

	return (
		<form onSubmit={handleReply}>
			<input
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
				type="text"
				placeholder="Write a reply..."
			/>
			<button>Reply</button>
			<button
				onClick={() => {
					setReplyingId();
				}}>
				Close
			</button>
		</form>
	);
};

export default ReplyForm;
