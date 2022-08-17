import { useSelector } from 'react-redux';
import { selectTripList } from '../../features/createTrip/tripListSlice';

function TripPlanner() {
	const tripList = useSelector(selectTripList);
	return (
		<div>
			{tripList.length
				? tripList.map((trip: any) => <div>{trip.name}</div>)
				: null}
		</div>
	);
}

export default TripPlanner;
