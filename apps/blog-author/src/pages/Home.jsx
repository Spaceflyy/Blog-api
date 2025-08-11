import { useUserContext } from "../../../shared/userContext/userContext";

const Home = () => {
	const { user } = useUserContext();
	return <>{user ? <h1>Welcome {user.username}</h1> : <h1>Not logged in</h1>}</>;
};

export default Home;
