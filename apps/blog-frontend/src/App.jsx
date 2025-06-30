import { Outlet } from "react-router-dom";
import Header from "./componenets/Header/Header.jsx";
import { UserContext } from "./contexts/UserContext.js";
import useUser from "./hooks/useUser.js";
import { useEffect } from "react";

//check if there is an access token, if there is the user is logged in
//if not call the refresh route to refresh the token, this also checks if there is a valid refresh token
//if there is the api call will return a new access token. if not the user remains logged out!

function App() {
	const user = useUser();
	useEffect(() => {
		console.log(user);
	}, [user]);
	return (
		<UserContext.Provider value={{ user }}>
			<>
				<Header />
				<Outlet />
			</>
		</UserContext.Provider>
	);
}

export default App;
