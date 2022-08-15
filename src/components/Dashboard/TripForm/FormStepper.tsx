import {
	Box,
	Button,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
// import { Send } from '@mui/icons-material';
import React, { useState } from 'react';
import { StepProps } from '../../../types/FormTypes';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';

function FormStepper() {
	// const submitRef: MutableRefObject<HTMLButtonElement | undefined> = useRef();
	const steps = ['General Information', 'Travel Details', 'Add Activities'];

	// 3: <FormStepThree />

	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped] = useState(new Set());

	const isStepOptional = (step: number) => step === 2;

	const isStepSkipped = (step: number) => skipped.has(step);

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
		// if (submitRef.current) submitRef.current.click();
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const formSteps = [<FormStepOne />, <FormStepTwo />];

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps: StepProps = { completed: false };
					const labelProps: any = {};
					if (isStepOptional(index)) {
						labelProps.optional = (
							<Typography variant="caption">Optional</Typography>
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
					<Typography sx={{ mt: 2, mb: 1 }}>
						All steps completed - you&apos;re finished
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Box sx={{ flex: '1 1 auto' }} />
						<Button onClick={handleReset}>Reset</Button>
					</Box>
				</>
			) : (
				<>
					<Typography sx={{ mt: 2, mb: 1 }}>{formSteps[activeStep]}</Typography>
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
	);
}

export default FormStepper;
