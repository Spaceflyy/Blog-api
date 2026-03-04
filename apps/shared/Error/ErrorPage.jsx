import { Link } from "react-router-dom";
const ErrorPage = () => {
	return (
		<>
			<p>Hello there has been an error</p>
			<Link to={"/"}>Return home</Link>
		</>
	);
};

export default ErrorPage;
