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
	Typography,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import TripLocationSearch from '../TripLocationSearch';
import {
	changeTravelType,
	changeTravelDepartureDate,
	selectNewTravel,
	// submitTravelDepartureLocation,
	// submitTravelArrivalLocation,
	submitFlightNumber,
} from '../../../redux/reducers/createTravel/createTravelSlice';
import { addTravel } from '../../../redux/reducers/createTravel/travelListSlice';
import createTravel from '../../../services/createTravelService';
import { selectUid } from '../../../redux/reducers/authSlice';

type Props = {
	handleCloseTravel: () => void;
};

const AddTravelSchema = yup.object().shape({
	travelType: yup.string().required('Please select a travel type'),
	departureDate: yup
		.string()
		.required('Please select a departure date and time'),
	flightNumber: yup.string(),
});

function AddTravelForm(props: Props) {
	const { handleCloseTravel } = props;
	const alertRef: React.MutableRefObject<boolean> = useRef(false);
	const dispatch = useAppDispatch();
	const newTravel: any = useAppSelector(selectNewTravel);
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
			!newTravel.originLocation ||
			!newTravel.destinationLocation
		) {
			alertRef.current = true;
		}
		if (isValid && newTravel.originLocation && newTravel.destinationLocation) {
			dispatch(submitFlightNumber(data.flightNumber));
			dispatch(addTravel(newTravel));
			handleCloseTravel();
			if (tripId && uid) {
				await createTravel(newTravel, uid, tripId, data);
				refreshPage();
			}
			// dispatch(submitTravelDepartureLocation(null));
			// dispatch(submitTravelArrivalLocation(null));
			// dispatch(changeTravelType(null));
			// dispatch(submitFlightNumber(null));
			// dispatch(changeTravelDepartureDate(null));
			// setValue('departureDate', undefined);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					mb={2}
					className="modal-form-container"
					sx={{ alignItems: 'center' }}
				>
					<Typography
						variant="h6"
						style={{ alignSelf: 'center', fontWeight: 'bold' }}
					>
						Add travel details
					</Typography>
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
						sx={{ width: '50%' }}
						{...register('departureDate')}
						error={!!errors.departureDate}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={handleStartDate}
					/>
					<FormControl {...register('travelType')} sx={{ width: '50%' }}>
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
							type="text"
							sx={{ width: '50%' }}
							{...register('flightNumber')}
							error={!!errors.flightNumber}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					) : null}
					<Button variant="contained" type="submit" aria-label="Save Travel">
						Save
					</Button>
				</Box>
			</form>
		</div>
	);
}

export default AddTravelForm;
