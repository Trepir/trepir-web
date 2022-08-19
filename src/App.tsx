import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import './App.css';
import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { createTheme } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import TopNavigation from './pages/TopNavigation';
import PrivateRoutes from './utils/PrivateRoutes';
import ReduxSample from './ReduxSample';
import Private from './pages/Private';
import Login from './pages/Login';
import TripForm from './pages/Dashboard/TripForm';
import Discover from './pages/Discover/Discover';
import TripPlanner from './pages/Dashboard/TripPlanner';

import { setUid } from './app/reducers/authSlice';

import Dashboard from './pages/Dashboard/Dashboard';
import CalendarView from './pages/Dashboard/CalendarView';

const primaryColor = '#1CB985';

const appTheme = createTheme({
	palette: {
		primary: {
			main: primaryColor,
			contrastText: '#fff',
		},
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: 'white',
					color: primaryColor,
				},
			},
		},
	},
});

function App() {
	const dispatch = useDispatch();
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log(user);
			dispatch(setUid(user.uid));
		} else {
			console.log('not logged in');
		}
	});

	return (
		<div className="App">
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<ThemeProvider theme={appTheme}>
					<Router>
						<TopNavigation />
						<Routes>
							<Route path="/calendar" element={<CalendarView />} />
							<Route path="/" element={<Login />} />
							<Route path="/login" element={<Login />} />
							<Route path="/dashboard/*" element={<Dashboard />} />
							<Route path="/discover/*" element={<Discover />} />
							<Route path="/redux" element={<ReduxSample />} />
							<Route path="/newtrip" element={<TripForm />} />
							<Route path="/trip/:id" element={<TripPlanner />} />
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
