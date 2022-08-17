import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import './App.css';
import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { createTheme } from '@mui/material';
import LandingPage from './pages/LandingPage';
import PrivateRoutes from './utils/PrivateRoutes';
import ReduxSample from './ReduxSample';
import Private from './pages/Private';
import Login from './pages/Login';
import TripForm from './pages/Dashboard/TripForm';
import Discover from './pages/Discover/Discover';

const primaryColor = '#1CB985';

const appTheme = createTheme({
	palette: {
		primary: {
			main: primaryColor,
			contrastText: '#fff',
		},
	},
});

function App() {
	return (
		<div className="App">
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<ThemeProvider theme={appTheme}>
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
				</ThemeProvider>
			</LocalizationProvider>
		</div>
	);
}

export default App;
