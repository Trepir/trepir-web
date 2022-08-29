import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUid } from '../redux/reducers/authSlice';
import { BASE_URL } from '../services/createTripService';
import { loadGoogleApi } from '../services/googleService';

import {
	addAllTrips,
	selectTripList,
} from '../redux/reducers/createTrip/tripListSlice';
import TripForm from '../pages/Dashboard/TripForm/TripForm';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import EditTripPage from '../pages/Dashboard/EditTrip/EditTrip';
import { resetMap } from '../redux/reducers/mapSlice';
import { fetchFavoriteActivities } from '../redux/reducers/createActivity/favoriteActivitySlice';

function Dashboard() {
	// ////LOAD MAP
	const map = loadGoogleApi();
	//	////////
	const dispatch = useDispatch();
	//  eslint-disable-next-line
	const tripList = useSelector(selectTripList);
	const uid = useSelector(selectUid);
	// CURRENTLY ADD TO TRIP ONLY WORKS IF WE GO THROUGH DASHBOARD
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
				const { trips, favoriteActivities } = jsonUserDetails;
				dispatch(addAllTrips(trips));
				if (favoriteActivities.length) {
					favoriteActivities.forEach((activity: any) => {
						dispatch(fetchFavoriteActivities(activity.activityId));
					});
				}
			} catch (e) {
				console.log(e);
			}
		};
		getTripList();
	}, [uid]);
	useEffect(() => {
		dispatch(resetMap('dashboard'));
	}, []);

	return (
		<div>
			{map ? (
				<Routes>
					<Route path="/" element={<DashboardHome />} />
					<Route path="/tripform" element={<TripForm />} />
					<Route path="/trip" element={<EditTripPage />} />
				</Routes>
			) : (
				<>loadingmap</>
			)}
		</div>
	);
}

export default Dashboard;
