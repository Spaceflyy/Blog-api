import Styles from "./home.module.css";

const Home = () => {
	return (
		<>
			<section className={Styles.heroSection}>
				<div className={Styles.heroContainer}>
					<h1>Its your story. Write it.</h1>
					<p>
						WEBSITENAME is home to a passionate community of diverse bloggers sharing
						their new discoveries, stories and unique perspectives of the world.
					</p>
					<p> Expand your horizons.</p>
					<button>Join now</button>
					<button>Login</button>
				</div>
			</section>
			<h2>Latest Posts</h2>
			<h2>call to arms</h2>
			<p>sign up / learn more buttons</p>

			<h2>footer</h2>
		</>
	);
};

export default Home;
