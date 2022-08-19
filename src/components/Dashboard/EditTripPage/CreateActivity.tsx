import './CreateActivity.css';
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

import TripLocationSearch from '../TripForm/TripLocationSearch';

// import { addTravel } from '../../../features/createTravel/travelListSlice';
import {
	selectNewActivity,
	submitActivityDescription,
	submitActivityName,
	submitActivityTimeEnd,
	submitActivityTimeStart,
	toggleActivityTags,
} from '../../../features/createActivity/createActivitySlice';

// Object {
// "description": "Una buena prueba",
// "duration": 5,
// "location": Object {
//   "city": "Barcelona",
//   "country": "Spain",
//   "googleId": "ChIJPRSERxGjpBIRSYRw_OI00Zw",
//   "latitude": 41.39496620000001,
//   "latitude": 41.39496620000001,
//   "locationName": "Codeworks",
//   "longitude": 2.1977755,
//   "state": "Catalunya",
// },
// "name": "Sergio Activity",
// "tags": Array [
//   "Entertainment",
//   "Landmark",
// ],
// "timeEnd": 1660843440000,
// "timeStart": 1660832640000,
// "uid": "1",
// }

const AddActivitySchema = yup.object().shape({
	name: yup.string().required('Please add a name'),
	description: yup.string().required('Please add a short description'),
	duration: yup.number().required('Please add an approximate duration'),
	tags: yup.mixed().required('Please add up to 3 tags'),
	timeStart: yup.number(),
	timeEnd: yup.number(),
});

function CreateActivityForm() {
	const alertRef: React.MutableRefObject<boolean> = useRef(false);
	const dispatch = useAppDispatch();
	const newActivity = useAppSelector(selectNewActivity);

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(AddActivitySchema),
	});

	const handleActivityTags = (event: any) => {
		dispatch(toggleActivityTags(event.target.value));
		setValue('activityTags', newActivity.tags, { shouldValidate: true });
	};

	const handleTimeStart = (event: any) => {
		dispatch(submitActivityTimeStart(event.target.value));
		setValue('timeStart', event.target.value, { shouldValidate: true });
	};
	const handleTimeEnd = (event: any) => {
		dispatch(submitActivityTimeEnd(event.target.value));
		setValue('timeEnd', event.target.value, { shouldValidate: true });
	};

	const onSubmit = async (data: any) => {
		const isValid = await AddActivitySchema.isValid(data);
		if (!isValid || !newActivity.location) {
			alertRef.current = true;
		}
		if (isValid && newActivity.location) {
			dispatch(submitActivityName(data.name));
			dispatch(submitActivityDescription(data.description));
			//   dispatch(submitActivityDuration),
			//  dispatch(toggleActivityTags),
			// dispatch(submitActivityTimeStart),
			//  dispatch(submitActivityTimeEnd),
			// 	setValue('departureDate', undefined);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={2} className="activity-form-container">
					<h2>Create an activity</h2>
					<TextField
						id="activityName"
						label="Name"
						type="text"
						sx={{ width: 220 }}
						{...register('activityName')}
						error={!!errors.activityName}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="activityDescription"
						label="Description"
						type="text"
						sx={{ width: 220 }}
						{...register('activityDescription')}
						error={!!errors.activityDescription}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TripLocationSearch inputLabel="activityLocation" />
					{alertRef.current ? (
						<Alert severity="error">Please insert a location!</Alert>
					) : null}
					<TextField
						id="activityDuration"
						label="Duration"
						type="text"
						sx={{ width: 220 }}
						{...register('activityDuration')}
						error={!!errors.activityDuration}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="timeStart"
						label="Start time"
						type="date"
						sx={{ width: 220 }}
						{...register('timeStart')}
						error={!!errors.timeStart}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={handleTimeStart}
					/>
					<TextField
						id="timeEnd"
						label="End time"
						type="date"
						sx={{ width: 220 }}
						{...register('timeEnd')}
						error={!!errors.timeEnd}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={handleTimeEnd}
					/>
					<FormControl {...register('activityTags')}>
						<InputLabel id="activityTags">Activity Tags</InputLabel>
						<Select
							variant="filled"
							labelId="travelType"
							id="travelType"
							value={newActivity.tags}
							label="travelType"
							onChange={handleActivityTags}
						>
							<MenuItem value="Flight">Flight</MenuItem>
							<MenuItem value="Bus">Bus</MenuItem>
							<MenuItem value="Boat">Boat</MenuItem>
							<MenuItem value="Car">Car</MenuItem>
							<MenuItem value="Train">Train</MenuItem>
						</Select>
					</FormControl>

					<Button type="submit" aria-label="Save Travel">
						Save
					</Button>
				</Box>
			</form>
		</div>
	);
}

export default CreateActivityForm;
