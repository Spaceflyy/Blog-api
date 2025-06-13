import { useState } from "react";

const handleSubmit = (e) => {
	e.preventDefault();
};

const SignupForm = () => {
	return (
		<>
			<form onSubmit={handleSubmit}>
				<h2>Sign up</h2>
				<label htmlFor="email">Email: </label>
				<input type="email" name="email" id="email" />
				<label htmlFor="firstname">First Name: </label>
				<input type="text" name="firstname" id="firstname" />
				<label htmlFor="lastname">Last Name: </label>
				<input type="text" name="lastname" id="lastname" />
				<label htmlFor="password">Password: </label>
				<input type="password" name="password" id="password" />
				<label htmlFor="confirmPass">Confirm Password: </label>
				<input type="password" name="confirmPass" id="confirmPass" />
			</form>
		</>
	);
};

export default SignupForm;
