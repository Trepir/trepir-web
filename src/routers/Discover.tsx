// import { useLoadScript } from '@react-google-maps/api';
import './Discover.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUid } from '../redux/reducers/authSlice';
import { resetDiscover } from '../redux/reducers/discoverSlice';
import { resetMap } from '../redux/reducers/mapSlice';
import HomePage from '../pages/Discover/DiscoverHome/DiscoverHome';
import MapPage from '../pages/Discover/DiscoverMap/DiscoverMap';
import { loadGoogleApi } from '../services/googleService';
import { getUserFavoriteActivities } from '../services/favoriteActivityService';
import { setUserFavoriteActivities } from '../redux/reducers/userSlice';
import { fetchFavoriteActivities } from '../redux/reducers/createActivity/favoriteActivitySlice';
import { addAllTrips } from '../redux/reducers/createTrip/tripListSlice';
import { BASE_URL } from '../utils/editTripUtils';

function Discover() {
	const uid = useSelector(selectUid);
	const dispatch = useDispatch();
	const map = loadGoogleApi();
	useEffect(() => {
		dispatch(resetMap('discover'));
		dispatch(resetDiscover());
	}, []);
	useEffect(() => {
		const getTripList = async () => {
			try {
				//	UID FAIL CHECK DO NOT REMOVE
				//		THIS USEEFFECT NOW WATCH THE UID VALUE AND WILL GET CALLED WHEN IT CHANGES
				if (!uid) return;

				const userDetails = await fetch(`${BASE_URL}user/signin`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ uid }),
				});
				const jsonUserDetails = await userDetails.json();
				const { trips } = jsonUserDetails;
				dispatch(addAllTrips(trips));
			} catch (e) {
				console.log(e);
			}
		};
		getTripList();
	}, [uid]);
	useEffect(() => {
		const getFavorites = async () => {
			if (uid) {
				const userFavorites: any[] = await getUserFavoriteActivities(uid);
				dispatch(setUserFavoriteActivities(userFavorites));
				userFavorites.forEach((activity: any) => {
					dispatch(fetchFavoriteActivities(activity.activityId));
				});
			}
		};
		getFavorites();
	}, [uid]);

	return (
		<div className="discover-container">
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
