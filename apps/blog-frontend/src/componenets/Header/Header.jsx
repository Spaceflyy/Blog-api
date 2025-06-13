import { Link } from "react-router-dom";
import Styles from "./header.module.css";
import { logout } from "../../api/auth";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const user = useUser();
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
							navigate("/login");
						}}
					>
						Logout
					</Link>
				</div>
			) : (
				<div>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
			)}
		</nav>
	);
};

export default Header;
