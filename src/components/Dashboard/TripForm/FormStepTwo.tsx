import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, TextField } from '@mui/material';
import React from 'react';

type Props = {
	submitRef: any;
	setValidated: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

const TripSchema = yup.object().shape({
	location: yup.string().required('Location is required'),
});

function FormStepTwo(props: Props) {
	const { submitRef, setValidated, setActiveStep } = props;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(TripSchema),
	});
	const onSubmit = async (data: any) => {
		const isValid = await TripSchema.isValid(data);
		if (isValid) {
			console.log('data', data);
			setValidated(true);
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={2}>
					<TextField
						variant="filled"
						label="Location"
						autoFocus
						{...register('location')}
						error={!!errors.location}
					/>
					<button
						ref={submitRef}
						type="submit"
						style={{ display: 'none' }}
						aria-label="Submit step"
					/>
				</Box>
			</form>
		</div>
	);
}

export default FormStepTwo;
