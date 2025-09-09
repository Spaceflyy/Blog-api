import { newComment } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../shared/userContext/userContext";
import { useParams } from "react-router-dom";
const CommentForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useUserContext();

	const handleSubmit = async (e) => {
		const comment = document.getElementById("leaveComment");
		e.preventDefault();
		if (comment.value.trim().length > 0) {
			const res = await newComment(id, user.id, comment.value);
			if (res.status === 200) {
				navigate(0);
			}
		}
	};
	return (
		<form method="POST" onSubmit={handleSubmit}>
			<label htmlFor="leaveComment"></label>
			<textarea
				name="leaveComment"
				id="leaveComment"
				placeholder="Leave a Comment..."
			></textarea>
			<button>Add Comment</button>
		</form>
	);
};

export default CommentForm;
