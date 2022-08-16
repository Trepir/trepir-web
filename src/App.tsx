import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import LandingPage from './pages/LandingPage';
import PrivateRoutes from './utils/PrivateRoutes';
import ReduxSample from './ReduxSample';
import Private from './pages/Private';
import Login from './pages/Login';
import TripForm from './pages/Dashboard/TripForm';
import Discover from './pages/Discover/Discover';

function App() {
	return (
		<div className="App">
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<Router>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/discover/*" element={<Discover />} />
						<Route path="/redux" element={<ReduxSample />} />
						<Route path="/newtrip" element={<TripForm />} />
						<Route element={<PrivateRoutes />}>
							<Route path="/private" element={<Private />} />
						</Route>
					</Routes>
				</Router>
			</LocalizationProvider>
		</div>
	);
}

export default App;
