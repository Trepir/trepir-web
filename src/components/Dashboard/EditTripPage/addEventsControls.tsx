import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Modal, Paper } from '@mui/material';
import CreateActivityForm from './CreateActivity';
import AddTravelForm from '../TripForm/AddTravelForm';
import AddAccommodationForm from '../TripForm/AddAccommodationForm';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '40vw',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function AddEventsControls() {
	const [openActivity, setOpenActivity] = useState(false);
	const handleOpenActivity = () => setOpenActivity(true);
	const handleCloseActivity = () => setOpenActivity(false);
	const [openTravel, setOpenTravel] = useState(false);
	const handleOpenTravel = () => setOpenTravel(true);
	const handleCloseTravel = () => setOpenTravel(false);
	const [openAccommodation, setOpenAccommodation] = useState(false);
	const handleOpenAccommodation = () => setOpenAccommodation(true);
	const handleCloseAccommodation = () => setOpenAccommodation(false);
	return (
		<>
			<Paper
				sx={{
					display: 'flex',
					gap: 5,
					padding: '0 0 3vh 0',
					margin: '0 0 0 0',
					height: '12.5vh',
					width: '49vw',
					position: 'fixed',
					left: '51vw',
					zIndex: 1,
					justifyContent: 'center',
					alignItems: 'flex-end',
					// backgroundColor: 'pink',
				}}
			>
				<Button variant="contained" onClick={handleOpenActivity}>
					Add Activity
				</Button>
				<Button variant="contained" onClick={handleOpenTravel}>
					Add Travel
				</Button>
				<Button variant="contained" onClick={handleOpenAccommodation}>
					Add Accomodation
				</Button>
			</Paper>

			<Modal
				open={openActivity}
				onClose={handleCloseActivity}
				aria-labelledby="create-activity-modal"
				aria-describedby="create-activity-modal"
			>
				<Box sx={style}>
					<CreateActivityForm handleCloseActivity={handleCloseActivity} />
				</Box>
			</Modal>
			<Modal
				open={openTravel}
				onClose={handleCloseTravel}
				aria-labelledby="create-travel-modal"
				aria-describedby="create-travel-modal"
			>
				<Box sx={style}>
					<AddTravelForm handleCloseTravel={handleCloseTravel} />
				</Box>
			</Modal>
			<Modal
				open={openAccommodation}
				onClose={handleCloseAccommodation}
				aria-labelledby="create-accommodation-modal"
				aria-describedby="create-accommodation-modal"
			>
				<Box sx={style}>
					<AddAccommodationForm
						handleCloseAccommodation={handleCloseAccommodation}
					/>
				</Box>
			</Modal>
		</>
	);
}

export default AddEventsControls;
