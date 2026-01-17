import { newComment } from "../../api/auth";
import { useUserContext } from "../../../../shared/userContext/userContext";

const CommentForm = ({ postId }) => {
	const { user } = useUserContext();

	const handleSubmit = async (e) => {
		const comment = document.getElementById("leaveComment");
		e.preventDefault();
		if (comment.value.trim().length > 0) {
			await newComment(postId, user.id, comment.value);
		}
	};
	return (
		<form method="POST" onSubmit={handleSubmit}>
			<label htmlFor="leaveComment"></label>
			<textarea
				name="leaveComment"
				id="leaveComment"
				placeholder="Leave a Comment..."></textarea>
			<button>Add Comment</button>
		</form>
	);
};

export default CommentForm;
