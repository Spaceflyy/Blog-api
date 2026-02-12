import { updateComment } from "../../api/auth";
import { useCommentContext } from "../../../../shared/commentContext/CommentContext";
import { useState } from "react";

const CommentEditor = ({ comment }) => {
	const { setEditingId, updatePostComment } = useCommentContext();
	const [inputValue, setInputValue] = useState(comment.content);
	const handleSumbit = async (e) => {
		e.preventDefault();
		if (inputValue.trim().length > 0) {
			await updateComment(comment.id, inputValue);

			updatePostComment({ ...comment, content: inputValue });
			setEditingId(null);
		}
	};

	return (
		<form onSubmit={handleSumbit}>
			<input
				onChange={(e) => setInputValue(e.target.value)}
				defaultValue={comment.content}></input>
			<button type="submit">Save</button>
			<button
				onClick={() => {
					setEditingId(null);
				}}>
				Cancel
			</button>
		</form>
	);
};

export default CommentEditor;
