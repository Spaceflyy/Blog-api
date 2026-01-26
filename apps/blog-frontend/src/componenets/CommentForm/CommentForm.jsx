import { newComment } from "../../api/auth";
import { useUserContext } from "../../../../shared/userContext/userContext";
import { useState } from "react";
const CommentForm = ({ addNewPostComment, postId }) => {
	const { user } = useUserContext();
	const [inputValue, setInputValue] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (inputValue.trim().length > 0) {
			const res = await newComment(postId, user.id, inputValue);
			const { comment } = res;
			comment.author = { username: user.username };

			if (res.status === 200) {
				addNewPostComment(comment);
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
