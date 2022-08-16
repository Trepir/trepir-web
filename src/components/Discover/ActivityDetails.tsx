import { useDispatch } from 'react-redux';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { setMarkers } from '../../app/reducers/mapSlice';

function ActivityDetails({ setSelectedActivity, activity }: any) {
	const dispatch = useDispatch();
	function handleClick() {
		dispatch(setMarkers());
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
