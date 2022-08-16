import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, TextField } from '@mui/material';

import { useAppDispatch } from '../../../app/hooks';
import {
	changeEndDate,
	changeStartDate,
} from '../../../features/createTrip/createTripSlice';
import TripLocationSearch from './TripLocationSearch';

type Props = {
	submitRef: any;
	setValidated: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

// const AddTravelSchema = yup.object().shape({
// 	name: yup.string().required('Name is required'),
// 	startDate: yup.string().required('Please select a start date'),
// 	endDate: yup.string().required('Please select an end date'),
// });

const AddAccommodationSchema = yup.object().shape({
	location: yup.string().required('Please insert a location'),
	startDate: yup.string().required('Please select a start date'),
	endDate: yup.string().required('Please select an end date'),
});

function FormStepTwo(props: Props) {
	const [showAccommodation, setShowAccommodation] = useState(false);
	const dispatch = useAppDispatch();
	// const newTrip = useAppSelector(selectNewTrip);

	const { submitRef, setValidated, setActiveStep } = props;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(AddAccommodationSchema),
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
		const isValid = await AddAccommodationSchema.isValid(data);
		if (isValid) {
			setValidated(true);
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};

	return (
		<div>
			<Button variant="contained" onClick={() => setShowAccommodation(true)}>
				Add Accommodation
			</Button>
			<Button variant="contained">Add Travel Details</Button>
			{/* Accommodation Form */}
			{showAccommodation ? (
				<div className="add-accommodation-form">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box mb={2}>
							<TripLocationSearch inputLabel="accommodationLocation" />
							<TextField
								id="checkinDate"
								label="Check-in date"
								type="date"
								sx={{ width: 220 }}
								{...register('checkinDate')}
								error={!!errors.checkinDate}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={handleStartDate}
							/>
							<TextField
								id="checkoutDate"
								label="Check-out date"
								type="date"
								sx={{ width: 220 }}
								{...register('checkoutDate')}
								error={!!errors.checkoutDate}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={handleEndDate}
							/>
							{/* Added an invisible button that gets artificially clicked by the parent component when next is clicked. */}
							<Button type="submit" aria-label="Save accommodation">
								Save
							</Button>
						</Box>
					</form>
				</div>
			) : null}
			<button
				ref={submitRef}
				type="submit"
				style={{ display: 'none' }}
				aria-label="Submit step"
			/>
		</div>
	);
}

export default FormStepTwo;
