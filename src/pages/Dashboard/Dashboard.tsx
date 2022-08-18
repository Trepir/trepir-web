import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../features/createTrip/createTripService';
import {
	addAllTrips,
	selectTripList,
} from '../../features/createTrip/tripListSlice';

function Dashboard() {
	const dispatch = useDispatch();
	const tripList = useSelector(selectTripList);
	console.log(tripList);
	useEffect(() => {
		const getTripList = async () => {
			try {
				const userDetails = await fetch(`${BASE_URL}user/signin`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ uid: '123456789' }),
				});
				const jsonUserDetails = await userDetails.json();
				const { trips } = jsonUserDetails;
				console.log(trips);
				dispatch(addAllTrips(trips));
			} catch (e) {
				console.log(e);
			}
		};
		getTripList();
	}, []);

	return (
		<div>
			{/* {tripList.length
				? tripList.map((trip: any) => <div>{trip.name}</div>)
				: null} */}
		</div>
	);
}

export default Dashboard;
