import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import './App.css';
import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { createTheme } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import TopNavigation from './pages/TopNavigation';
import PrivateRoutes from './utils/PrivateRoutes';
import Private from './pages/Private';
import Login from './pages/Login';
import Discover from './pages/Discover/Discover';

import { setUid } from './app/reducers/authSlice';

import Dashboard from './pages/Dashboard/Dashboard';

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
			dispatch(setUid(user.uid));
		} else {
			console.log('not logged in');
		}
	});

	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			<ThemeProvider theme={appTheme}>
				<Router>
					<TopNavigation />
					<Routes>
						<Route path="/" element={<Navigate to="/discover" />} />
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard/*" element={<Dashboard />} />
						<Route path="/discover/*" element={<Discover />} />
						<Route element={<PrivateRoutes />}>
							<Route path="/private" element={<Private />} />
						</Route>
					</Routes>
				</Router>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
