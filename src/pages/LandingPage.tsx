import { Link } from 'react-router-dom';

function LandingPage() {
	return (
		<div>
			<p>LandingPage</p>
			<p>
				<Link to="/login">Login</Link>
			</p>
			<p>
				<Link to="/redux">Redux</Link>
			</p>
			<p>
				<Link to="/private">Private</Link>
			</p>
		</div>
	);
}

export default LandingPage;
