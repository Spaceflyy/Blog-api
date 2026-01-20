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

	const removeComment = (commentId) => {
		setPost((prevPost) => ({
			...prevPost,
			comments: prevPost.comments.filter((comment) => {
				return comment.id !== commentId;
			}),
		}));
	};

	const addNewPostComment = (newComment) => {
		setPost((prevPost) => ({
			...prevPost,
			comments: [...prevPost.comments, { newComment }],
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
