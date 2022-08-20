import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Modal } from '@mui/material';
import CreateActivityForm from './CreateActivity';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function AddEventsControls() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					gap: 8,
					margin: '3vw 0 0 0',
					width: '50vw',
					justifyContent: 'center',
				}}
			>
				<Button variant="contained" onClick={handleOpen}>
					Add Activity
				</Button>
				<Button variant="contained">Add Travel</Button>
				<Button variant="contained">Add Accomodation</Button>
			</Box>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="create-activity-modal"
				aria-describedby="create-activity-modal"
			>
				<Box sx={style}>
					<CreateActivityForm />
				</Box>
			</Modal>
		</>
	);
}

export default AddEventsControls;
