import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { Link } from "react-router-dom";
import Styles from "./loginForm.module.css";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
const LoginForm = () => {
	const navigate = useNavigate();
	const [info, setInfo] = useState({ email: "", password: "" });
	const handleChange = (e) => {
		e.preventDefault();
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;

		setInfo({ email: email, password: password });
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const response = await login(info);
		console.log(response.status);
		if (response.status === 200) {
			navigate("/posts");
		}
		if (response.status === 400) {
			setInfo({ email: "", password: "" });
		}
	};

	return (
		<div className={`${Styles.container}`}>
			<form onSubmit={handleLogin} className={`${Styles.test}`}>
				<h2>Welcome!</h2>
				<div className={`${Styles.inputContainer}`}>
					<label htmlFor="email">Email: </label>
					<input
						value={info.email}
						onChange={handleChange}
						type="email"
						name="email"
						id="email"
					/>
					<PersonIcon
						sx={{ fontSize: 28, color: "black" }}
						className={`${Styles.icon}`}
					/>
				</div>
				<div className={`${Styles.inputContainer}`}>
					<label htmlFor="password">Password:</label>

					<input
						value={info.password}
						onChange={handleChange}
						type="password"
						name="password"
						id="password"
					/>
					<VisibilityIcon
						sx={{ fontSize: 28, color: "black" }}
						className={`${Styles.icon}`}
					/>
				</div>
				<p>
					Not a member? <Link>Sign up</Link>
				</p>
				<button>Login</button>
			</form>

			{/* <button onClick={handleClick}></button> */}
		</div>
	);
};

export default LoginForm;
