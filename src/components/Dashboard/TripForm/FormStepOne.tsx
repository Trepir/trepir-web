import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, TextField } from '@mui/material';
import React from 'react';

import { useAppDispatch } from '../../../app/hooks';
import { submitStepOne } from '../../../features/createTrip/createTripSlice';
import TripLocationSearch from './TripLocationSearch';

type Props = {
	submitRef: any;
	setValidated: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

const TripSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
});

function FormStepOne(props: Props) {
	const dispatch = useAppDispatch();

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
			setValidated(true);
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
			dispatch(submitStepOne(data));
		}
	};

	// Added an invisible button that gets artificially clicked by the parent component when next is clicked.
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={2}>
					<TextField
						variant="filled"
						label="Name of the trip"
						autoFocus
						{...register('name')}
						error={!!errors.name}
					/>
					<button
						ref={submitRef}
						type="submit"
						style={{ display: 'none' }}
						aria-label="Submit step"
					/>
				</Box>
				<TripLocationSearch />
			</form>
		</div>
	);
}

export default FormStepOne;
