import { Link } from "react-router-dom";
import { useUserContext } from "../../../shared/userContext/userContext";
import { deletePost } from "../../api/postApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { user } = useUserContext();
	const navigate = useNavigate();

	const handleDelete = async (postId) => {
		await deletePost(postId);
		navigate(0);
	};
	return (
		<>
			{user ? (
				<>
					<h1>Welcome {user.username}</h1>
					{user.posts.length > 0 ? (
						<h2>Your Posts</h2>
					) : (
						<p>No posts Found. Create a new one to view them here!</p>
					)}
					{user?.posts.map((post) => {
						return (
							<div key={post.id}>
								<Link to={`/posts/${post.id}`}>
									<h3>{post.title}</h3>
								</Link>
								<p>{post.created_at}</p>
								<button
									onClick={() => {
										handleDelete(post.id);
									}}
								>
									Delete Post
								</button>
								<Link to={`/posts/edit/${post.id}`}>
									<button> Edit Post</button>
								</Link>
							</div>
						);
					})}
				</>
			) : (
				<h1>Not logged in</h1>
			)}
		</>
	);
};

export default Home;
