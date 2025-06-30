import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const Posts = () => {
	const { user } = useContext(UserContext);
	return <>{user ? <h1>Welcome {user.username}</h1> : <h1>Not logged in</h1>}</>;
};

export default Posts;
