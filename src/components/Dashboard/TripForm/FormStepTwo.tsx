import React, { useState } from 'react';

import { Box, Button, Modal } from '@mui/material';

import { useAppSelector } from '../../../app/hooks';

import { selectNewAccommodation } from '../../../features/createAccommodation/createAccommodationSlice';

import AddAccommodationForm from './AddAccommodationForm';
import AddTravelForm from './AddTravelForm';
import { primaryColor } from '../../../pages/TopNavigation';

type Props = {
	submitRef: any;
	setValidated: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

function FormStepTwo(props: Props) {
	// ACTIVITY FORM MODAL LOGIC TO BE REUSED ANYWHERE
	const [openAccommodation, setOpenAccommodation] = useState(false);
	const [openTravel, setOpenTravel] = useState(false);
	const handleOpenAccommodation = () => setOpenAccommodation(true);
	const handleCloseAccommodation = () => setOpenAccommodation(false);
	const handleOpenTravel = () => setOpenTravel(true);
	const handleCloseTravel = () => setOpenTravel(false);
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '40vw',
		bgcolor: 'background.paper',
		border: `2px solid ${primaryColor}`,
		boxShadow: 24,
		p: 4,
	};
	// ////////////////////////////////////

	const newAccommodation = useAppSelector(selectNewAccommodation);
	console.log('hello there', newAccommodation);

	const { submitRef, setValidated, setActiveStep } = props;

	const handleClick = () => {
		console.log('hello');
		setValidated(true);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	return (
		<div className="step-container">
			<div className="modal-buttons-container">
				<Button
					variant="contained"
					className="modal-button"
					onClick={handleOpenAccommodation}
					sx={{ fontWeight: 'bold' }}
				>
					Add Accommodation Details
				</Button>
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
				<Button
					variant="contained"
					className="modal-button"
					onClick={handleOpenTravel}
					sx={{ fontWeight: 'bold' }}
				>
					Add Travel Details
				</Button>
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
			</div>
			<button
				ref={submitRef}
				type="button"
				onClick={handleClick}
				style={{ display: 'none' }}
				aria-label="Submit step"
			/>
		</div>
	);
}

export default FormStepTwo;
