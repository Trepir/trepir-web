import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUid } from '../../app/reducers/authSlice';
import { BASE_URL } from '../../features/createTrip/createTripService';
import LeftDrawer from '../LeftDrawer';
import { loadGoogleApi } from '../../utils/googleMaps/googleService';

import {
	addAllTrips,
	selectTripList,
} from '../../features/createTrip/tripListSlice';
import TripForm from './TripForm';
import DashboardHome from '../../components/Dashboard/DashboardHome/DashboardHome';
import EditTripPage from '../../components/Dashboard/EditTripPage/EditTripPage';
import { resetMap } from '../../app/reducers/mapSlice';
import { fetchFavoriteActivities } from '../../features/createActivity/favoriteActivitySlice';

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
						console.log('added', activity.activityId);
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
				<>
					<LeftDrawer />
					<Routes>
						<Route path="/" element={<DashboardHome />} />
						<Route path="/createtrip" element={<TripForm />} />
						<Route path="/trip" element={<EditTripPage />} />
					</Routes>
				</>
			) : null}
		</div>
	);
}

export default Dashboard;
