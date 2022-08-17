import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
	return (
		<div>
			<h1>Trepir</h1>
			<div>
				<Link to="/login">Login</Link>
			</div>
			<div>
				<Link to="/redux">Redux</Link>
			</div>
			<div>
				<Link to="/discover">Discover</Link>
			</div>
			<div>
				<Link to="/newtrip">New Trip</Link>
			</div>
			<div>
				<Link to="/private">Private</Link>
			</div>
		</div>
	);
}

export default LandingPage;
