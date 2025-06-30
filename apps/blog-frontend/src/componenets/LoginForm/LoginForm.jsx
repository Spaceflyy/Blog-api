import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { Link } from "react-router-dom";
import styles from "./loginForm.module.css";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
	const navigate = useNavigate();
	const [info, setInfo] = useState({ email: "", password: "" });
	const [showPass, setShowPass] = useState(false);

	const handleChange = (e) => {
		e.preventDefault();
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;

		setInfo({ email: email, password: password });
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const response = await login(info);
		if (response.status === 200) {
			navigate("/posts");
		}
		if (response.status === 400) {
			setInfo({ email: "", password: "" });
		}
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleLogin} className={styles.test}>
				<h2>Welcome!</h2>
				<div className={styles.inputContainer}>
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
						className={styles.icon}
					/>
				</div>
				<div className={styles.inputContainer}>
					<label htmlFor="password">Password:</label>

					<input
						value={info.password}
						onChange={handleChange}
						type={showPass ? "text" : "password"}
						name="password"
						id="password"
					/>

					{showPass ? (
						<VisibilityOffIcon
							sx={{ fontSize: 28, color: "black" }}
							onClick={() => {
								setShowPass(!showPass);
							}}
							className={styles.icon}
						/>
					) : (
						<VisibilityIcon
							sx={{ fontSize: 28, color: "black" }}
							onClick={() => {
								setShowPass(!showPass);
							}}
							className={styles.icon}
						/>
					)}
				</div>
				<p>
					Not a member? <Link to={"/signup"}>Sign up</Link>
				</p>
				<button>Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
