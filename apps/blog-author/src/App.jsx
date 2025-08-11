import Header from "./components/Header/Header.jsx";
import PostEditor from "./components/PostEditor/PostEditor.jsx";
import { Outlet } from "react-router-dom";

import UserProvider from "../../shared/userContext/userContext.jsx";
import "./index.css";

function App() {
	return (
		<UserProvider>
			<Header />
			<Outlet />
		</UserProvider>
	);
}

export default App;
