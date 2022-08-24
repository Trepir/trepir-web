import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Modal, Paper } from '@mui/material';
import CreateActivityForm from './CreateActivity';
import AddTravelForm from '../TripForm/AddTravelForm';
import AddAccommodationForm from '../TripForm/AddAccommodationForm';
import { primaryColor } from '../../../pages/TopNavigation';

const style = {
	alignItems: 'center',
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50vw',
	bgcolor: 'background.paper',
	border: '4px solid',
	borderColor: primaryColor,
	borderRadius: '12px',
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
					padding: '0 0 3.5vh 0',
					margin: '0 0 0 0',
					height: '12vh',
					width: '49vw',
					position: 'fixed',
					left: '51vw',
					zIndex: 1,
					justifyContent: 'center',
					alignItems: 'flex-end',
					// backgroundColor: 'pink',
				}}
				elevation={0}
			>
				<Button
					variant="contained"
					style={{
						borderRadius: 15,
						width: 128,
					}}
					onClick={handleOpenActivity}
				>
					Add Activity
				</Button>
				<Button
					variant="contained"
					style={{
						borderRadius: 15,
						width: 128,
					}}
					onClick={handleOpenTravel}
				>
					Add Travel
				</Button>
				<Button
					variant="contained"
					style={{
						borderRadius: 15,
						width: 128,
					}}
					onClick={handleOpenAccommodation}
				>
					Add Housing
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
