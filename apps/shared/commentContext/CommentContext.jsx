import { createContext, useContext, useState } from "react";
const commentContext = createContext();

const CommentProvider = ({ children }) => {
	const [editingId, setEditingId] = useState(null);
	const [replyingId, setReplyingId] = useState(null);
	const [post, setPost] = useState();

	const recursiveRemoveComment = (comments, commentId) => {
		return comments
			.filter((comment) => comment.id !== commentId)
			.map((comment) => ({
				...comment,
				...(comment.replies && {
					replies: recursiveRemoveComment(comment.replies, commentId),
				}),
			}));
	};

	const recursiveAddComment = (comments, newComment) => {
		return comments.map((comment) => {
			if (comment.id === newComment.parentCommentId) {
				return { ...comment, replies: [newComment, ...(comment.replies || [])] };
			}

			return {
				...comment,
				...(comment.replies && {
					replies: recursiveAddComment(comment.replies, newComment),
				}),
			};
		});
	};

	const removePostComment = (commentId) => {
		setPost((prevPost) => ({
			...prevPost,
			comments: recursiveRemoveComment(prevPost.comments, commentId),
		}));
	};

	const addPostComment = (newComment) => {
		setPost((prevPost) => ({
			...prevPost,
			comments: newComment.parentCommentId
				? recursiveAddComment(prevPost.comments, newComment)
				: [newComment, ...prevPost.comments],
		}));
	};

	const updatePostComment = (newComment) => {
		setPost((prevPost) => ({
			...prevPost,

			comments: prevPost.comments.map((comment) => {
				return comment.id === newComment.id ? newComment : comment;
			}),
		}));
	};
	return (
		<commentContext.Provider
			value={{
				post,
				setPost,
				addPostComment,
				removePostComment,
				updatePostComment,
				editingId,
				setEditingId,
				replyingId,
				setReplyingId,
			}}>
			{children}
		</commentContext.Provider>
	);
};

export const useCommentContext = () => {
	return useContext(commentContext);
};

export default CommentProvider;
