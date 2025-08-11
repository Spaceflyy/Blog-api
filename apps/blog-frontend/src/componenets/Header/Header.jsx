import { Link } from "react-router-dom";
import Styles from "./header.module.css";
import { logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../shared/userContext/userContext";

import LightModeIcon from "@mui/icons-material/LightMode";

const Header = () => {
	const { user, setUser } = useUserContext();
	const navigate = useNavigate();

	const toggleTheme = (e) => {
		e.preventDefault();
		document.body.classList.toggle("light");
	};
	return (
		<nav>
			<div>
				<Link to="/">Home</Link>
				{user?.isAuthor && <Link to="http://localhost:5174/">Dashboard</Link>}
			</div>
			<div>
				<LightModeIcon onClick={toggleTheme}></LightModeIcon>
				{user ? (
					<>
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
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/signup">Register</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Header;
