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
import { DateTime } from 'luxon';

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../../redux/hooks';
import {
	selectNewTrip,
	submitTripLocation,
} from '../../../redux/reducers/createTrip/createTripSlice';
import { StepProps } from '../../../types/FormTypes';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
import {
	resetAccommodationList,
	selectAccommodationList,
} from '../../../redux/reducers/createAccommodation/accommodationListSlice';
import {
	resetTravelList,
	selectTravelList,
} from '../../../redux/reducers/createTravel/travelListSlice';
import {
	createTrip,
	addInitialActivities,
} from '../../../services/createTripService';
import { addTrip } from '../../../redux/reducers/createTrip/tripListSlice';
import { selectUid } from '../../../redux/reducers/authSlice';
import {
	setSelectedTrip,
	setSelectedTripId,
} from '../../../redux/reducers/createTrip/selectedTripSlice';
import createTravel from '../../../services/createTravelService';
import createAccommodation from '../../../services/createAccommodationService';
import FormStepThree from './FormStepThree';
import TravelEvent from '../../Shared/Cards/TravelCard';
import AccommodationEvent from '../../Shared/Cards/AccommodationCard';

// import {
// 	submitNewTrip,
// } from '../../../features/createTrip/createTripSlice';

function FormStepper() {
	const accommodationList = useAppSelector(selectAccommodationList);
	const travelList = useAppSelector(selectTravelList);
	const submitRef: React.MutableRefObject<any> = useRef();
	const alertRef: React.MutableRefObject<boolean> = useRef(false);
	const steps = ['General Information', 'Travel Details', 'Add Activities'];
	const newTrip = useAppSelector(selectNewTrip);

	const formattedStartDate = DateTime.fromISO(newTrip.startDate)
		.toUTC()
		.toFormat('MMM dd, yyyy');

	const formattedEndDate = DateTime.fromISO(newTrip.endDate)
		.toUTC()
		.toFormat('MMM dd, yyyy');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	///	ADDING UID LOGIC AND FAIL CHECK
	const uid: string | null = useSelector(selectUid);

	const [validated, setValidated] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped] = useState(new Set());
	const [photoUrl, setPhotoUrl] = useState(undefined);

	const isStepOptional = (step: number) => step === -1;

	const isStepSkipped = (step: number) => skipped.has(step);

	// DO NOT REMOVE! THIS DETERMINES WHETHER THE TRAVEL/ACCOMMODATION SHOULD BE SENT TO BACK END
	useEffect(() => {
		const getPhotoUrl = async () => {
			if (newTrip.placeDetails) {
				const photoUrlResult = await newTrip.placeDetails.photos[0].getUrl();
				setPhotoUrl(photoUrlResult);
			}
		};
		getPhotoUrl();
		dispatch(setSelectedTripId(null));
		dispatch(setSelectedTrip(null));
	}, [newTrip.placeDetails]);

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
			if (activeStep === steps.length) {
				//	UID FAIL CHECK
				if (!uid) {
					alert('not logged in');
					return;
				}
				const createdTrip = await createTrip(newTrip, uid);
				travelList.forEach(async (travelEvent: any) => {
					await createTravel(travelEvent, uid, createdTrip.id);
				});
				accommodationList.forEach(async (accommodationEvent: any) => {
					await createAccommodation(accommodationEvent, uid, createdTrip.id);
				});

				dispatch(addTrip(createdTrip));
				// setActiveStep((prevActiveStep) => prevActiveStep + 1);
				// Pending call to backend and use trip id for params
				//	SET YOUR SELECTED TRIP BEFORE NAIGATING TO edit page
				localStorage.setItem('tripId', createdTrip.id);
				navigate('../trip');
				dispatch(setSelectedTripId(createdTrip.id));

				await addInitialActivities(
					newTrip.initialTripFavorites,
					createdTrip.id
				);
				dispatch(resetTravelList);
				dispatch(resetAccommodationList);
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
		<FormStepThree
			submitRef={submitRef}
			setValidated={setValidated}
			setActiveStep={setActiveStep}
		/>,
	];

	return (
		<div className="trip-form-container">
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
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
					<Box
						sx={{
							display: 'flex',
							width: '90%',
							padding: 5,
							alignItems: 'center',
							justifyContent: 'center',

							// backgroundColor: 'yellow',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								// backgroundColor: 'pink',
								// justifyContent: 'space-around',
								gap: '5vh',
								width: '22vw',
								margin: '0 1vw 0 0',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '2rem',
								}}
							>
								<Typography variant="h4" style={{ fontWeight: 'bold' }}>
									{newTrip.name}
								</Typography>
							</div>
							<div>
								<Typography
									variant="h5"
									style={{ color: 'rgba(28, 185, 133, 1)', fontWeight: 'bold' }}
								>
									Location:
								</Typography>
								<Typography variant="h6" style={{ marginBottom: '2rem' }}>
									{newTrip.placeDetails
										? newTrip.placeDetails.formatted_address
										: null}
								</Typography>
								<Typography
									variant="h5"
									style={{ color: 'rgba(28, 185, 133, 1)', fontWeight: 'bold' }}
								>
									Dates:
								</Typography>
								<Typography variant="h6">
									<strong>Start: </strong>
									{newTrip.startDate ? formattedStartDate : null}
								</Typography>
								<Typography variant="h6">
									<strong>End: </strong>
									{newTrip.startDate ? formattedEndDate : null}
								</Typography>
							</div>
						</Box>

						<img
							src={newTrip.placeDetails ? photoUrl : ''}
							alt="location pic"
							style={{
								width: '17vw',
								height: '17vw',
								borderRadius: 15,
								justifySelf: 'center',
							}}
						/>
					</Box>
				) : null}
				{activeStep === steps.length + 1 ? (
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
								sx={{ mr: 1, fontWeight: 'bold' }}
							>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto' }} />
							{isStepOptional(activeStep) && (
								<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
									Skip
								</Button>
							)}
							<Button onClick={handleNext} sx={{ fontWeight: 'bold' }}>
								{activeStep === steps.length ? 'Finish' : 'Next'}
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
								<AccommodationEvent activity={event} />
						  ))
						: null}
				</div>
				<div className="travel-event-list">
					{travelList.length
						? travelList.map((event) => <TravelEvent activity={event} />)
						: null}
				</div>
			</div>
		</div>
	);
}

export default FormStepper;
