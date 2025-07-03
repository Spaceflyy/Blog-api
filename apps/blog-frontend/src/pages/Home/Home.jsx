import Styles from "./home.module.css";

const Home = () => {
	return (
		<>
			<div className={Styles.heroContainer}>
				<h1>Join now</h1>
				<p>
					Join the community of the most passionate bloggers covering a wide range of
					subjects
				</p>
				<button>Sign Up</button>
			</div>
			<h2>Latest Posts</h2>
			<h2>call to arms</h2>
			<p>sign up / learn more buttons</p>

			<h2>footer</h2>
		</>
	);
};

export default Home;
