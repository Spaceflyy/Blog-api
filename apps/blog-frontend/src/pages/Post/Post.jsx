import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentForm from "../../componenets/CommentForm/CommentForm";

import Comment from "../../componenets/Comment/Comment";
const Post = () => {
	const [post, setPost] = useState();
	const [editingId, setEditingId] = useState(null);
	const [replyingId, setReplyingId] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				let res = await fetch(`http://localhost:3000/posts/${id}`, {
					method: "GET",
					credentials: "include",
				});

				if (res.status === 200) {
					setPost(await res.json());
				}
			} catch (error) {
				console.error(error);
				setPost();
			}
		})();
	}, [id]);

	const updatePostComments = (newComment) => {
		setPost((prevPost) => ({
			...prevPost,

			comments: prevPost.comments.map((comment) => {
				return comment.id === newComment.id ? newComment : comment;
			}),
		}));
	};

	const findRemoveComment = (comments, commentId) => {
		return comments
			.filter((comment) => comment.id !== commentId)
			.map((comment) => ({
				...comment,
				...(comment.replies && {
					replies: findRemoveComment(comment.replies, commentId),
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

	const removeComment = (commentId) => {
		setPost((prevPost) => ({
			...prevPost,
			comments: findRemoveComment(prevPost.comments, commentId),
		}));
	};

	const addNewPostComment = (newComment) => {
		//find parent comment with parentcommentId
		//add comment to replies array

		setPost((prevPost) => ({
			...prevPost,
			comments: newComment.parentCommentId
				? recursiveAddComment(prevPost.comments, newComment)
				: [newComment, ...prevPost.comments],
		}));
	};

	return (
		<>
			<h1>{post?.title}</h1>
			<span dangerouslySetInnerHTML={{ __html: post?.content }} />

			<CommentForm addNewPostComment={addNewPostComment} postId={id} />
			<h2>{post?.comments.length} Comments</h2>

			{post?.comments.map((comment) => {
				if (comment.parentCommentId !== null) {
					return;
				}
				return (
					<Comment
						postId={post.id}
						key={comment.id}
						comment={comment}
						editingId={editingId}
						replyingId={replyingId}
						setEditingId={setEditingId}
						setReplyingId={setReplyingId}
						updatePostComments={updatePostComments}
						removeComment={removeComment}
						addNewPostComment={addNewPostComment}
					/>
				);
			})}
		</>
	);
};

export default Post;
