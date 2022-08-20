// import { useLoadScript } from '@react-google-maps/api';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../components/Discover/HomePage';
import MapPage from '../../components/Discover/MapPage';
import { loadGoogleApi } from '../../utils/googleMaps/googleService';

// const libraries: any = ['places'];

function Discover() {
	const map = loadGoogleApi();
	return (
		<div>
			{map ? (
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/map/*" element={<MapPage />} />
				</Routes>
			) : (
				<>loadingmap</>
			)}
		</div>
	);
}

export default Discover;
