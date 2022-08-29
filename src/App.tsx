import './assets/Gilroy-FREE/Gilroy-Light.otf';
import './assets/Gilroy-FREE/Gilroy-ExtraBold.otf';
import { useEffect, useState } from 'react';

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
import TopNavigation from './components/Shared/TopNavigation';
import PrivateRoutes from './utils/PrivateRoutes';
import Login from './pages/Login/Login';
import Discover from './routers/Discover';

import { setUid } from './Redux/reducers/authSlice';

import Dashboard from './routers/Dashboard';
import LandingMobile from './components/LandingMobile';
import Playground from './pages/playground/Playground';

export const primaryColor = '#1CB985';
export const gilroyLight = './assets/Gilroy-FREE/Gilroy-Light.otf';
export const gilroyExtra = './assets/Gilroy-FREE/Gilroy-ExtraBold.otf';

const appTheme = createTheme({
	palette: {
		primary: {
			main: primaryColor,
			contrastText: '#fff',
		},
	},
	typography: {
		fontFamily: gilroyLight,
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			@font-face {
				font-family: gilroy;
				src: url('./assets/Gilroy-FREE/Gilroy-ExtraBold.otf');
				font-weight: bold;
			}
			@font-face {
				font-family: gilroy;
				src: url('./assets/Gilroy-FREE/Gilroy-Light.otf');
				font-weight: normal;
			}
      `,
		},

		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: '#13996D',
					color: 'white',
				},
			},
		},
	},
});

function App() {
	const [matches, setMatches] = useState(
		window.matchMedia('(min-width: 950px)').matches
	);

	useEffect(() => {
		window
			.matchMedia('(min-width: 950px)')
			.addEventListener('change', (e) => setMatches(e.matches));
	}, []);
	const dispatch = useDispatch();
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(setUid(user.uid));
		}
	});

	return (
		<div>
			{matches && (
				<LocalizationProvider dateAdapter={AdapterLuxon}>
					<ThemeProvider theme={appTheme}>
						<Router>
							<TopNavigation />
							<Routes>
								<Route path="/" element={<Navigate to="/discover" />} />
								<Route path="/login" element={<Login />} />
								<Route path="/discover/*" element={<Discover />} />
								<Route element={<PrivateRoutes />}>
									<Route path="/playground" element={<Playground />} />
									<Route path="/dashboard/*" element={<Dashboard />} />
								</Route>
							</Routes>
						</Router>
					</ThemeProvider>
				</LocalizationProvider>
			)}
			{!matches && <LandingMobile />}
		</div>
	);
}
export default App;
