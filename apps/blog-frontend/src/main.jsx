import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Posts from "./pages/Posts/Posts.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "posts", element: <Posts /> },
			{ path: "login", element: <LoginPage /> },
			{
				path: "signup",
				element: <Signup />,
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
