// import { useLoadScript } from '@react-google-maps/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { resetMap } from '../../app/reducers/mapSlice';
import HomePage from '../../components/Discover/HomePage';
import MapPage from '../../components/Discover/MapPage';
import { loadGoogleApi } from '../../utils/googleMaps/googleService';

function Discover() {
	const dispatch = useDispatch();
	const map = loadGoogleApi();
	useEffect(() => {
		dispatch(resetMap());
	}, []);

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
