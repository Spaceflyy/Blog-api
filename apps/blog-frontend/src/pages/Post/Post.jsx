import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCommentContext } from "../../../../shared/commentContext/CommentContext";
import CommentForm from "../../componenets/CommentForm/CommentForm";

import Comment from "../../componenets/Comment/Comment";
const Post = () => {
	const { post, setPost } = useCommentContext();

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

	return (
		<>
			<h1>{post?.title}</h1>
			<span dangerouslySetInnerHTML={{ __html: post?.content }} />

			<CommentForm postId={id} />
			<h2>{post?.comments.length} Comments</h2>

			{post?.comments.map((comment) => {
				if (comment.parentCommentId !== null) {
					return;
				}
				return <Comment postId={post.id} key={comment.id} comment={comment} />;
			})}
		</>
	);
};

export default Post;
