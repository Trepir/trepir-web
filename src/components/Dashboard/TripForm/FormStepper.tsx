import {
	Alert,
	Box,
	Button,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import {
	selectNewTrip,
	submitTripLocation,
} from '../../../features/createTrip/createTripSlice';
import { StepProps } from '../../../types/FormTypes';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
// import {
// 	submitNewTrip,
// } from '../../../features/createTrip/createTripSlice';

function FormStepper() {
	const submitRef: React.MutableRefObject<any> = useRef();
	const alertRef: React.MutableRefObject<boolean> = useRef(false);
	const steps = ['Travel Details', 'Add Activities'];
	const newTrip = useAppSelector(selectNewTrip);
	const dispatch = useDispatch();

	const [validated, setValidated] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped] = useState(new Set());

	const isStepOptional = (step: number) => step === 0;

	const isStepSkipped = (step: number) => skipped.has(step);

	const handleNext = () => {
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
				console.log(newTrip);
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
		</div>
	);
}

export default FormStepper;
