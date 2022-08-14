import { Link } from 'react-router-dom';

function LandingPage() {
	return (
		<div>
			<h1>Trepir</h1>
			<p>
				<Link to="/login">Login</Link>
			</p>
			<p>
				<Link to="/redux">Redux</Link>
			</p>
			<p>
				<Link to="/newtrip">New Trip</Link>
			</p>
			<p>
				<Link to="/private">Private</Link>
			</p>
		</div>
	);
}

export default LandingPage;
