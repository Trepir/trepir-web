import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
	Box,
	Button,
	TextField,
	Alert,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import TripLocationSearch from './TripLocationSearch';
import {
	changeTravelType,
	changeTravelDepartureDate,
	selectNewTravel,
	submitTravelDepartureLocation,
	submitTravelArrivalLocation,
	submitFlightNumber,
} from '../../../features/createTravel/createTravelSlice';
import { addTravel } from '../../../features/createTravel/travelListSlice';

type Props = {
	setShowTravel: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTravelSchema = yup.object().shape({
	travelType: yup.string().required('Please select a travel type'),
	departureDate: yup
		.string()
		.required('Please select a departure date and time'),
	flightNumber: yup.string(),
});

function AddTravelForm(props: Props) {
	const alertRef: React.MutableRefObject<boolean> = useRef(false);
	const { setShowTravel } = props;
	const dispatch = useAppDispatch();
	const newTravel = useAppSelector(selectNewTravel);

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(AddTravelSchema),
	});

	const handleTravelType = (event: any) => {
		dispatch(changeTravelType(event.target.value));
		setValue('travelType', event.target.value, { shouldValidate: true });
	};

	const handleStartDate = (event: any) => {
		dispatch(changeTravelDepartureDate(event.target.value));
		setValue('checkinDate', event.target.value, { shouldValidate: true });
	};

	const onSubmit = async (data: any) => {
		console.log('in', data);
		const isValid = await AddTravelSchema.isValid(data);
		console.log(isValid);
		if (
			!isValid ||
			!newTravel.departureLocation ||
			!newTravel.arrivalLocation
		) {
			alertRef.current = true;
		}
		if (isValid && newTravel.departureLocation && newTravel.arrivalLocation) {
			dispatch(submitFlightNumber(data.flightNumber));
			dispatch(addTravel(newTravel));
			setShowTravel(false);
			dispatch(submitTravelDepartureLocation(null));
			dispatch(submitTravelArrivalLocation(null));
			dispatch(changeTravelType(null));
			dispatch(submitFlightNumber(null));
			dispatch(changeTravelDepartureDate(null));
			setValue('departureDate', undefined);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={2} className="modal-form-container">
					<TripLocationSearch inputLabel="travelDepartureLocation" />
					{alertRef.current ? (
						<Alert severity="error">Please insert a departure location!</Alert>
					) : null}
					<TripLocationSearch inputLabel="travelArrivalLocation" />
					{alertRef.current ? (
						<Alert severity="error">Please insert an arrival location!</Alert>
					) : null}
					<TextField
						id="departureDate"
						label="Departure date"
						type="date"
						sx={{ width: 220 }}
						{...register('departureDate')}
						error={!!errors.departureDate}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={handleStartDate}
					/>
					<FormControl {...register('travelType')}>
						<InputLabel id="flightNumber">Travel Type</InputLabel>
						<Select
							variant="filled"
							labelId="travelType"
							id="travelType"
							value={newTravel.travelType}
							label="travelType"
							onChange={handleTravelType}
						>
							<MenuItem value="Flight">Flight</MenuItem>
							<MenuItem value="Bus">Bus</MenuItem>
							<MenuItem value="Boat">Boat</MenuItem>
							<MenuItem value="Car">Car</MenuItem>
							<MenuItem value="Train">Train</MenuItem>
						</Select>
					</FormControl>
					{newTravel.travelType === 'flight' ? (
						<TextField
							id="flightNumber"
							label="Flight Number"
							type="date"
							sx={{ width: 220 }}
							{...register('flightNumber')}
							error={!!errors.flightNumber}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					) : null}
					<Button type="submit" aria-label="Save Travel">
						Save
					</Button>
				</Box>
			</form>
		</div>
	);
}

export default AddTravelForm;
