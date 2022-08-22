import { useDispatch, useSelector } from 'react-redux';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
	selectPrevViewportCoords,
	setMapViewport,
	// setMarkers,
} from '../../app/reducers/mapSlice';

function ActivityDetails({ setSelectedActivity, activity }: any) {
	const dispatch = useDispatch();
	const prevViewport = useSelector(selectPrevViewportCoords);
	function handleClick() {
		dispatch(setMapViewport(prevViewport));
		setSelectedActivity(false);
	}

	return (
		<>
			<Fab onClick={() => handleClick()}>
				<ArrowBackIcon />
			</Fab>
			<div>{activity.name}</div>
			<div>{activity.description}</div>
		</>
	);
}

export default ActivityDetails;
