import { useState } from "react";

const LoginForm = () => {
	const [info, setInfo] = useState({ username: "", password: "" });
	const handleChange = (e) => {
		e.preventDefault();
		let email = document.getElementById("username").value;
		let password = document.getElementById("password").value;

		setInfo({ username: email, password: password });
	};

	const getToken = async (e) => {
		e.preventDefault();

		await fetch("http://localhost:3000/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username: info.username, password: info.password }),
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (response) {
				console.log(response);
			});
	};

	return (
		<form onSubmit={getToken}>
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
	);
};

export default LoginForm;
