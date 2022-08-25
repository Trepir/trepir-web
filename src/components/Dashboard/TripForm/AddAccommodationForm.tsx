import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, TextField, Alert, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import TripLocationSearch from './TripLocationSearch';
import {
	changeAccommodationEndDate,
	changeAccommodationStartDate,
	selectNewAccommodation,
	// submitAccommodationLocation,
} from '../../../features/createAccommodation/createAccommodationSlice';
import { addAccommodation } from '../../../features/createAccommodation/accommodationList';
import createAccommodation from '../../../features/createAccommodation/createAccommodationService';
import { selectUid } from '../../../app/reducers/authSlice';

type Props = {
	handleCloseAccommodation: () => void;
};

const AddAccommodationSchema = yup.object().shape({
	checkinDate: yup.string().required('Please select a start date'),
	checkoutDate: yup.string().required('Please select an end date'),
});
function AddAccommodationForm(props: Props) {
	const { handleCloseAccommodation } = props;
	const alertRef: React.MutableRefObject<boolean> = useRef(false);
	const dispatch = useAppDispatch();
	const newAccommodation: any = useAppSelector(selectNewAccommodation);
	const uid: string | null = useSelector(selectUid);
	const tripId = localStorage.getItem('tripId');

	function refreshPage() {
		if (tripId) window.location.reload();
	}

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(AddAccommodationSchema),
	});

	const handleStartDate = (event: any) => {
		dispatch(changeAccommodationStartDate(event.target.value));
		setValue('checkinDate', event.target.value, { shouldValidate: true });
	};
	const handleEndDate = (event: any) => {
		dispatch(changeAccommodationEndDate(event.target.value));
		setValue('checkoutDate', event.target.value, { shouldValidate: true });
	};

	const onSubmit = async (data: any) => {
		const isValid = await AddAccommodationSchema.isValid(data);
		if (!isValid || !newAccommodation.location) {
			alertRef.current = true;
		}
		if (isValid && newAccommodation.location) {
			dispatch(addAccommodation(newAccommodation));
			if (tripId && uid) {
				await createAccommodation(newAccommodation, uid, tripId, data);
			}
			handleCloseAccommodation();
			refreshPage();
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={2} className="modal-form-container">
					<Typography
						variant="h6"
						style={{ alignSelf: 'center', fontWeight: 'bold' }}
					>
						Add housing
					</Typography>
					<TripLocationSearch inputLabel="accommodationLocation" />
					{alertRef.current ? (
						<Alert severity="error">Please insert a location!</Alert>
					) : null}
					<TextField
						id="checkinDate"
						label="Check-in date"
						type="date"
						sx={{ width: '50%' }}
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
						sx={{ width: '50%' }}
						{...register('checkoutDate')}
						error={!!errors.checkoutDate}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={handleEndDate}
					/>
					<Button
						variant="contained"
						type="submit"
						aria-label="Save accommodation"
					>
						Save
					</Button>
				</Box>
			</form>
		</div>
	);
}

export default AddAccommodationForm;
