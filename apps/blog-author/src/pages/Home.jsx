import { Link } from "react-router-dom";
import { useUserContext } from "../../../shared/userContext/userContext";

const Home = () => {
	const { user } = useUserContext();
	return (
		<>
			{user ? (
				<>
					<h1>Welcome {user.username}</h1> <h2>Your Posts</h2>
				</>
			) : (
				<h1>Not logged in</h1>
			)}
			{user?.posts.map((post) => {
				return (
					<div>
						<Link to={`/posts/${post.id}`}>
							<h3>{post.title}</h3>
						</Link>
						<p>{post.created_at}</p>
					</div>
				);
			})}
			{/* <div dangerouslySetInnerHTML={{ __html: user?.posts[4].content }} /> */}
		</>
	);
};

export default Home;
