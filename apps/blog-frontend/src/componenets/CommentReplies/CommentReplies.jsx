import { Link } from "react-router-dom";
import { useState } from "react";
import Comment from "../Comment/Comment";
const CommentReplies = ({ comment, postId }) => {
	const [viewReplying, setViewReplying] = useState(false);

	return (
		<div>
			{comment.replies?.length > 0 && !viewReplying ? (
				<Link
					onClick={() => {
						setViewReplying(true);
					}}>
					View {comment.replies?.length} replies
				</Link>
			) : (
				comment.replies?.map((reply) => {
					return (
						<div style={{ padding: "0 0 0 50px" }}>
							<Comment key={reply.id} comment={reply} postId={postId} />
						</div>
					);
				})
			)}
			{viewReplying && (
				<Link
					onClick={() => {
						setViewReplying(false);
					}}>
					Hide replies
				</Link>
			)}
		</div>
	);
};

export default CommentReplies;
