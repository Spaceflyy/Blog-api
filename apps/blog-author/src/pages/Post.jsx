import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
	const [post, setPost] = useState();
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
	}, []);

	return (
		<>
			<h1>{post?.title}</h1>
			<span dangerouslySetInnerHTML={{ __html: post?.content }} />
		</>
	);
};

export default Post;
