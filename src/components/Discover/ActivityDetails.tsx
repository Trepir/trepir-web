import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ActivityDetails() {
	return (
		<>
			<Fab component={Link} to="../">
				<ArrowBackIcon />
			</Fab>
			<div>Activity Details</div>
			<div>Activity Name</div>
		</>
	);
}

export default ActivityDetails;
