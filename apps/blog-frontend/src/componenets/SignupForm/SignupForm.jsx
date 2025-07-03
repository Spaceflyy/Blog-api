import { useState } from "react";
import { newUser, login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Styles from "../LoginForm/loginForm.module.css";
const SignupForm = () => {
	const navigate = useNavigate();
	const [info, setInfo] = useState({
		email: "",
		firstname: "",
		lastname: "",
		password: "",
		username: "",
		confirmPass: "",
		isAuthor: false,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (info.password === info.confirmPass) {
			const res = await newUser(info);
			if (res.status === 200) {
				const response = await login(info);
				if (response.status === 200) {
					navigate("/posts");
				} else {
					navigate("/login");
				}
			}
		}
	};
	return (
		<div className={Styles.container}>
			<form onSubmit={handleSubmit}>
				<h2>Sign up</h2>
				<div className={Styles.inputContainer}>
					<label htmlFor="email">Email: </label>
					<input
						onChange={(e) => setInfo({ ...info, email: e.target.value })}
						value={info.email}
						type="email"
						name="email"
						id="email"
					/>
				</div>
				<div className={Styles.inputContainer}>
					<label htmlFor="username">Username: </label>
					<input
						onChange={(e) => setInfo({ ...info, username: e.target.value })}
						value={info.username}
						type="text"
						name="username"
						id="username"
					/>
				</div>
				<div className={Styles.inputContainer}>
					<label htmlFor="firstname">First Name: </label>
					<input
						onChange={(e) => setInfo({ ...info, firstname: e.target.value })}
						value={info.firstname}
						type="text"
						name="firstname"
						id="firstname"
					/>
				</div>
				<div className={Styles.inputContainer}>
					<label htmlFor="lastname">Last Name: </label>
					<input
						onChange={(e) => setInfo({ ...info, lastname: e.target.value })}
						value={info.lastname}
						type="text"
						name="lastname"
						id="lastname"
					/>
				</div>
				<div className={Styles.inputContainer}>
					<label htmlFor="password">Password: </label>
					<input
						onChange={(e) => setInfo({ ...info, password: e.target.value })}
						value={info.password}
						type="password"
						name="password"
						id="password"
					/>
				</div>
				<div className={Styles.inputContainer}>
					<label htmlFor="confirmPass">Confirm Password: </label>
					<input
						onChange={(e) => setInfo({ ...info, confirmPass: e.target.value })}
						value={info.confirmPass}
						type="password"
						name="confirmPass"
						id="confirmPass"
					/>
				</div>
				<div>
					<label htmlFor="isAuthor">Sign up as author? </label>
					<input
						onChange={(e) => {
							setInfo({ ...info, isAuthor: e.target.checked });
						}}
						checked={info.isAuthor}
						type="checkbox"
						name="isAuthor"
						id="isAuthor"
					/>
				</div>
				<button>Sign up</button>
			</form>
		</div>
	);
};

export default SignupForm;
