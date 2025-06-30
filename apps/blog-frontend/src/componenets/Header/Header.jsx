import { Link } from "react-router-dom";
import Styles from "./header.module.css";
import { logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const Header = () => {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();
	return (
		<nav>
			<div>
				<Link to="/">Home</Link>
				<Link to="">Dashboard</Link>
			</div>
			{user ? (
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
				<div>
					<Link to="/login">Login</Link>
					<Link to="/signup">Register</Link>
				</div>
			)}
		</nav>
	);
};

export default Header;
