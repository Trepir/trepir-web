import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../features/createTrip/createTripService';
import {
	selectTripDetails,
	selectTripId,
	setSelectedTrip,
} from '../../features/createTrip/selectedTripSlice';
import DaysView from './DaysView';

function CalendarView() {
	const id = useSelector(selectTripId);
	const dispatch = useDispatch();
	const { tripDetails } = useSelector(selectTripDetails);
	useEffect(() => {
		const getTripDetails = async () => {
			//	TRIPID FAIL CHECK DO NOT REMOVE
			//		THIS USEEFFECT NOW WATCH THE TRIPID VALUE AND WILL GET CALLED WHEN IT CHANGES
			if (id) {
				try {
					const fetchTripDetails = await fetch(
						`${BASE_URL}trip/tripById/${id}`
					);
					const jsonTripDetails = await fetchTripDetails.json();
					dispatch(setSelectedTrip(jsonTripDetails));
				} catch (e) {
					console.log(e);
				}
			}
		};
		getTripDetails();
	}, [id]);

	return (
		<div>
			<div>{tripDetails.name ? <h2>{tripDetails.name}</h2> : null}</div>
			<div>
				{tripDetails.tripDay ? (
					<DaysView
						days={tripDetails.tripDay}
						startDate={tripDetails.startDate}
						duration={tripDetails.tripDay.length}
					/>
				) : null}
			</div>
		</div>
	);
}

export default CalendarView;
