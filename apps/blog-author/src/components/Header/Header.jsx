import { Link } from "react-router-dom";
import Styles from "./header.module.css";
// import { logout } from "../../api/auth";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../contexts/UserContext";
// import { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";

const Header = () => {
	// const { user, setUser } = useContext(UserContext);
	// const navigate = useNavigate();

	const toggleTheme = (e) => {
		e.preventDefault();
		document.body.classList.toggle("light");
	};
	return (
		<nav>
			<div>
				<Link to="http://localhost:5173/">Home</Link>
				<Link to="new-post" className="btn">
					New Post
				</Link>
			</div>
			{/* {user ? (
				<div>
					<Link to="/posts">Posts</Link>
					<Link to="/register">Profile</Link>
					<Link
						onClick={async () => {
							await logout();
							setUser();
							navigate("/login");
						}}
					>
						Logout
					</Link>
				</div>
			) : (
				
			)} */}
			<div>
				<LightModeIcon onClick={toggleTheme}></LightModeIcon>
			</div>
		</nav>
	);
};

export default Header;
