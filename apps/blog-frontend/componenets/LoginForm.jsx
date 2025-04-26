import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const navigate = useNavigate();
	const [info, setInfo] = useState({ username: "", password: "" });
	const handleChange = (e) => {
		e.preventDefault();
		let email = document.getElementById("username").value;
		let password = document.getElementById("password").value;

		setInfo({ username: email, password: password });
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:3000/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ username: info.username, password: info.password }),
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (response) {
				return response;
			});
		if (response.message === "ok") {
			navigate("/posts");
		} else {
			setInfo({ username: "", password: "" });
		}
	};

	return (
		<>
			<form onSubmit={handleLogin}>
				<h2>Login</h2>
				<label htmlFor="email">Email: </label>
				<input
					value={info.username}
					onChange={handleChange}
					type="email"
					name="email"
					id="username"
				/>
				<label htmlFor="password">Password: </label>
				<input
					value={info.password}
					onChange={handleChange}
					type="password"
					name="password"
					id="password"
				/>
				<button>Submit</button>
			</form>
		</>
	);
};

export default LoginForm;
