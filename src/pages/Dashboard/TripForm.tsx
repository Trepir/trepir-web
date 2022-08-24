import './TripForm.css';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fab from '@mui/material/Fab';
import FormStepper from '../../components/Dashboard/TripForm/FormStepper';

function TripForm() {
	return (
		<>
			<Fab
				component={Link}
				to="../"
				style={{ position: 'absolute', left: '1rem', top: '10vh' }}
			>
				<ArrowBackIcon />
			</Fab>
			<div className="dashboard-container">
				<FormStepper />
			</div>
		</>
	);
}

export default TripForm;
