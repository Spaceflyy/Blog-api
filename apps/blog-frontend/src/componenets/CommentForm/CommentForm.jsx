import { newComment } from "../../api/auth";
import { useUserContext } from "../../../../shared/userContext/userContext";
import { useCommentContext } from "../../../../shared/commentContext/CommentContext";
import { useState } from "react";
const CommentForm = ({ postId }) => {
	const { user } = useUserContext();
	const { addPostComment } = useCommentContext();
	const [inputValue, setInputValue] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (inputValue.trim().length > 0) {
			const res = await newComment(postId, user.id, inputValue);
			const { comment } = res;
			comment.author = { username: user.username };

			if (res.status === 200) {
				addPostComment(comment);
			}
		}
	};
	return (
		<form method="POST" onSubmit={handleSubmit}>
			<label htmlFor="leaveComment"></label>
			<textarea
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				value={inputValue}
				name="leaveComment"
				id="leaveComment"
				placeholder="Leave a Comment..."></textarea>
			<button>Add Comment</button>
		</form>
	);
};

export default CommentForm;
