import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
	changeEndDate,
	changeStartDate,
	selectNewTrip,
	submitStepOne,
} from '../../../features/createTrip/createTripSlice';
import TripLocationSearch from './TripLocationSearch';

type Props = {
	submitRef: any;
	alertRef: any;
	setValidated: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

const TripSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	startDate: yup.string().required('Please select a start date'),
	endDate: yup.string().required('Please select an end date'),
});

function FormStepOne(props: Props) {
	const dispatch = useAppDispatch();
	const newTrip = useAppSelector(selectNewTrip);

	const { submitRef, alertRef, setValidated, setActiveStep } = props;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(TripSchema),
	});

	const handleStartDate = (event: any) => {
		dispatch(changeStartDate(event.target.value));
		setValue('startDate', event.target.value, { shouldValidate: true });
	};
	const handleEndDate = (event: any) => {
		dispatch(changeEndDate(event.target.value));
		setValue('endDate', event.target.value, { shouldValidate: true });
	};

	const onSubmit = async (data: any) => {
		const isValid = await TripSchema.isValid(data);
		if (isValid && newTrip.location) {
			setValidated(true);

			setActiveStep((prevActiveStep) => prevActiveStep + 1);
			dispatch(submitStepOne(data));
		}
		if (isValid && !newTrip.location) {
			setValidated(true);
			alertRef.current = true;
		}
	};

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
				</Box>
				<TripLocationSearch />
				<TextField
					id="startDate"
					label="Start date"
					type="date"
					sx={{ width: 220 }}
					{...register('startDate')}
					error={!!errors.startDate}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={handleStartDate}
				/>
				<TextField
					id="endDate"
					label="End date"
					type="date"
					sx={{ width: 220 }}
					{...register('endDate')}
					error={!!errors.endDate}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={handleEndDate}
				/>
				{/* Added an invisible button that gets artificially clicked by the parent component when next is clicked. */}
				<button
					ref={submitRef}
					type="submit"
					style={{ display: 'none' }}
					aria-label="Submit step"
				/>
			</form>
		</div>
	);
}

export default FormStepOne;
