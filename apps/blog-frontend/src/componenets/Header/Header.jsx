import { Link } from "react-router-dom";
import Styles from "./header.module.css"
const Header = () => {
	return (
		<nav>
			<div>
				<Link to="/">Home</Link>
				<Link to="">Dashboard</Link>
			</div>
			
			<div>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</div>
		</nav>
	);
};

export default Header;
