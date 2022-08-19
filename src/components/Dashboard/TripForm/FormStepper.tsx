import {
	Alert,
	Box,
	Button,
	Step,
	StepLabel,
	Stepper,
	Typography,
	Divider,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import {
	selectNewTrip,
	submitTripLocation,
} from '../../../features/createTrip/createTripSlice';
import { StepProps } from '../../../types/FormTypes';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
import { selectAccommodationList } from '../../../features/createAccommodation/accommodationList';
import { selectTravelList } from '../../../features/createTravel/travelListSlice';
import TravelEventList from './TravelEventList';
import createTrip from '../../../features/createTrip/createTripService';
import { addTrip } from '../../../features/createTrip/tripListSlice';
import { selectUid } from '../../../app/reducers/authSlice';
import {
	setSelectedTrip,
	setSelectedTripId,
} from '../../../features/createTrip/selectedTripSlice';

// import {
// 	submitNewTrip,
// } from '../../../features/createTrip/createTripSlice';

function FormStepper() {
	const accommodationList = useAppSelector(selectAccommodationList);
	const travelList = useAppSelector(selectTravelList);
	const submitRef: React.MutableRefObject<any> = useRef();
	const alertRef: React.MutableRefObject<boolean> = useRef(false);
	const steps = ['Travel Details', 'Add Activities'];
	const newTrip = useAppSelector(selectNewTrip);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	///	ADDING UID LOGIC AND FAIL CHECK
	const uid = useSelector(selectUid);

	const [validated, setValidated] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped] = useState(new Set());

	const isStepOptional = (step: number) => step === 0;

	const isStepSkipped = (step: number) => skipped.has(step);

	// DO NOT REMOVE! THIS DETERMINES WHETHER THE TRAVEL/ACCOMMODATION SHOULD BE SENT TO BACK END
	useEffect(() => {
		dispatch(setSelectedTripId(null));
		dispatch(setSelectedTrip(null));
	}, []);

	const handleNext = async () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}
		// submitRef.current.click() artificially clicks the submit button of the relevant form step
		if (submitRef.current) submitRef.current.click();
		if (validated) {
			setSkipped(newSkipped);
			setValidated(false);
			alertRef.current = false;
			if (activeStep === steps.length - 1) {
				//	UID FAIL CHECK
				if (!uid) {
					alert('not logged in');
					return;
				}
				const createdTrip = await createTrip(newTrip, uid);

				dispatch(addTrip(createdTrip));
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
				// Pending call to backend and use trip id for params
				navigate(`/trip/${createdTrip.id}`, { replace: true });
			}
		}
	};

	const handleBack = () => {
		if (activeStep > 0) {
			dispatch(submitTripLocation(null));
			setActiveStep((prevActiveStep) => prevActiveStep - 1);
		}
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			throw new Error("You can't skip a step that isn't optional.");
		}
		// submitRef.current.click() artificially clicks the submit button of the relevant form step

		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			setActiveStep((prevActiveStep) => prevActiveStep + 1);

			newSkipped.add(activeStep);
			return newSkipped;
		});
		setValidated(false);
		if (activeStep === steps.length - 1) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const formSteps = [
		<div>
			<FormStepOne
				submitRef={submitRef}
				alertRef={alertRef}
				setValidated={setValidated}
				setActiveStep={setActiveStep}
			/>
			{alertRef.current ? (
				<Alert severity="error">Please insert a location!</Alert>
			) : null}
		</div>,
		<FormStepTwo
			submitRef={submitRef}
			setValidated={setValidated}
			setActiveStep={setActiveStep}
		/>,
	];

	return (
		<div className="trip-form-container">
			<Box sx={{ width: '100%' }}>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps: StepProps = { completed: false };
						const labelProps: any = {};
						if (isStepOptional(index)) {
							labelProps.optional = (
								<Typography component="span" variant="caption">
									Optional
								</Typography>
							);
						}
						if (isStepSkipped(index)) {
							stepProps.completed = false;
						}
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				{activeStep === steps.length ? (
					<>
						<Typography component="span" sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleReset}>Reset</Button>
						</Box>
					</>
				) : (
					<>
						<Typography component="span" sx={{ mt: 2, mb: 1 }}>
							{formSteps[activeStep]}
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto' }} />
							{isStepOptional(activeStep) && (
								<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
									Skip
								</Button>
							)}
							<Button onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</Box>
					</>
				)}
			</Box>
			<Divider />
			<div className="travel-event-container">
				<div className="travel-event-list">
					{accommodationList.length
						? accommodationList.map((event) => (
								<TravelEventList event={event} />
						  ))
						: null}
				</div>
				<div className="travel-event-list">
					{travelList.length
						? travelList.map((event) => <TravelEventList event={event} />)
						: null}
				</div>
			</div>
		</div>
	);
}

export default FormStepper;
