import useUser from "../../hooks/useUser";
import Header from "../../componenets/Header/Header";
const Posts = () => {
	const user = useUser();
	return (
		<>
			<Header />
			{user ? (
				<h1>Welcome {user.username}</h1>
			) : (
				<h1>Not logged in {JSON.stringify(user)}</h1>
			)}
		</>
	);
};

export default Posts;
