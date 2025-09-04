import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Posts = () => {
	const [posts, setPosts] = useState();

	useEffect(() => {
		(async () => {
			try {
				let res = await fetch(`http://localhost:3000/posts`, {
					method: "GET",
					credentials: "include",
				});

				if (res.status === 200) {
					setPosts(await res.json());
				}
			} catch (error) {
				console.error(error);
				setPosts();
			}
		})();
	}, []);

	return (
		<>
			{posts?.map((post) => {
				return (
					<div key={post.id}>
						<Link to={`/post/${post.id}`}>
							<h2>{post.title}</h2>
						</Link>
						<p>By {post.author.username}</p>
						<p>Created at {post.created_at}</p>
					</div>
				);
			})}
		</>
	);
};

export default Posts;
