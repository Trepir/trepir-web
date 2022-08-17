import React, { useState } from 'react';

import { Button } from '@mui/material';

import { useAppSelector } from '../../../app/hooks';

import { selectNewAccommodation } from '../../../features/createAccommodation/createAccommodationSlice';

import AddAccommodationForm from './AddAccommodationForm';
import AddTravelForm from './AddTravelForm';

type Props = {
	submitRef: any;
	setValidated: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

function FormStepTwo(props: Props) {
	const [showAccommodation, setShowAccommodation] = useState(false);
	const [showTravel, setShowTravel] = useState(false);

	const newAccommodation = useAppSelector(selectNewAccommodation);
	console.log(newAccommodation);

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
					disabled={showTravel}
					onClick={() => setShowAccommodation(true)}
				>
					Add Accommodation
				</Button>
				<Button
					variant="contained"
					disabled={showAccommodation}
					onClick={() => setShowTravel(true)}
				>
					Add Travel Details
				</Button>
			</div>
			{showAccommodation ? (
				<AddAccommodationForm setShowAccommodation={setShowAccommodation} />
			) : null}
			{showTravel ? <AddTravelForm setShowTravel={setShowTravel} /> : null}
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
