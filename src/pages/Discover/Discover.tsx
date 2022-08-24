// import { useLoadScript } from '@react-google-maps/api';
import './Discover.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUid } from '../../app/reducers/authSlice';
import { resetDiscover } from '../../app/reducers/discoverSlice';
import { resetMap } from '../../app/reducers/mapSlice';
import HomePage from '../../components/Discover/HomePage';
import MapPage from '../../components/Discover/MapPage';
import { loadGoogleApi } from '../../utils/googleMaps/googleService';
import { getUserFavoriteActivities } from '../../features/createActivity/favoriteActivityService';
import { setUserFavoriteActivities } from '../../app/reducers/userSlice';
import { fetchFavoriteActivities } from '../../features/createActivity/favoriteActivitySlice';

function Discover() {
	const uid = useSelector(selectUid);
	const dispatch = useDispatch();
	const map = loadGoogleApi();
	useEffect(() => {
		dispatch(resetMap('discover'));
		dispatch(resetDiscover());
	}, []);
	useEffect(() => {
		const getFavorites = async () => {
			if (uid) {
				const userFavorites: any[] = await getUserFavoriteActivities(uid);
				dispatch(setUserFavoriteActivities(userFavorites));
				console.log(userFavorites);
				userFavorites.forEach((activity: any) => {
					dispatch(fetchFavoriteActivities(activity.activityId));
				});
			}
		};
		getFavorites();
	}, [uid]);

	return (
		<div>
			{map ? (
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/map/*" element={<MapPage />} />
				</Routes>
			) : null}
		</div>
	);
}

export default Discover;
