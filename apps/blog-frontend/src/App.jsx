import { Outlet } from "react-router-dom";
import Header from "./componenets/Header/Header.jsx";

//check if there is an access token, if there is the user is logged in
//if not call the refresh route to refresh the token, this also checks if there is a valid refresh token
//if there is the api call will return a new access token. if not the user remains logged out!

function App() {
	return (
		<>
			<Outlet />
		</>
	);
}

export default App;
