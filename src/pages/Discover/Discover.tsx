import { Route, Routes } from 'react-router-dom';
import HomePage from '../../components/Discover/HomePage';
import MapPage from '../../components/Discover/MapPage';

function Discover() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/map" element={<MapPage />} />
		</Routes>
	);
}

export default Discover;
