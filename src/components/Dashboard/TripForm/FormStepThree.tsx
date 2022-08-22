import React from 'react';

type Props = {
	submitRef: any;
	setValidated: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

function FormStepThree(props: Props) {
	// ACTIVITY FORM MODAL LOGIC TO BE REUSED ANYWHERE

	// ////////////////////////////////////

	const { submitRef, setValidated, setActiveStep } = props;

	const handleClick = () => {
		console.log('hello');
		setValidated(true);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	return (
		<div className="step-container">
			<div className="favorite-activities-container">Hello</div>
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

export default FormStepThree;
