import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import PrivateRoutes from './utils/PrivateRoutes';
import ReduxSample from './ReduxSample';
import Private from './pages/Private';
import Login from './pages/Login';
import TripForm from './pages/TripForm';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/redux" element={<ReduxSample />} />
					<Route path="/newtrip" element={<TripForm />} />
					<Route element={<PrivateRoutes />}>
						<Route path="/private" element={<Private />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
