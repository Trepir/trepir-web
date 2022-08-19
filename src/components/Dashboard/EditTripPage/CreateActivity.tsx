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
	Select,
	MenuItem,
	OutlinedInput,
	Chip,
	SelectChangeEvent,
} from '@mui/material';

import { useTheme } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import TripLocationSearch from '../TripForm/TripLocationSearch';

// import { addTravel } from '../../../features/createTravel/travelListSlice';
import {
	selectNewActivity,
	submitActivityDescription,
	submitActivityName,
	// submitActivityTimeEnd,
	// submitActivityTimeStart,
	submitActivityTag,
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const tags = [
	'Relax',
	'Landmark',
	'Entertainment',
	'Drinks',
	'Restaurant',
	'Adventure',
	'Museum',
	'Outdoors',
	'Tour',
	'Beach',
	'Culture',
	'Nightlife',
	'Nature',
	'Festivity',
	'Sport',
];

function getStyles(name: string, tag: readonly string[], theme: any) {
	return {
		fontWeight:
			tag.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const AddActivitySchema = yup.object().shape({
	name: yup.string().required('Please add a name'),
	description: yup.string().required('Please add a short description'),
	durationHours: yup.number().required('Please add an approximate duration'),
	durationMinutes: yup.number().required('Please add an approximate duration'),
	tags: yup.mixed().required('Please add up to 3 tags'),
	// timeStart: yup.number(),
	// timeEnd: yup.number(),
});

function CreateActivityForm() {
	const theme = useTheme();
	const alertRef: React.MutableRefObject<boolean> = useRef(false);
	const dispatch = useAppDispatch();
	const newActivity = useAppSelector(selectNewActivity);

	const {
		register,
		// setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(AddActivitySchema),
	});

	const handleActivityTags = (event: SelectChangeEvent<any>) => {
		const {
			target: { value },
		} = event;
		dispatch(
			submitActivityTag(typeof value === 'string' ? value.split(',') : value)
		);
		// setValue('activityTags', newActivity.tag, {
		// 	shouldValidate: true,
		// });
	};

	// To be ins
	// const handleTimeStart = (event: any) => {
	// 	dispatch(submitActivityTimeStart(event.target.value));
	// 	setValue('timeStart', event.target.value, { shouldValidate: true });
	// };
	// const handleTimeEnd = (event: any) => {
	// 	dispatch(submitActivityTimeEnd(event.target.value));
	// 	setValue('timeEnd', event.target.value, { shouldValidate: true });
	// };

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
					{/* <TextField
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
					/> */}
					<div className="form-row">
						<TextField
							type="number"
							InputProps={{ inputProps: { min: 0, max: 12 } }}
							variant="filled"
							label="Duration (hours)"
							fullWidth
							{...register('durationHours')}
							error={!!errors.durationHours}
						/>
						{/* 'YEAR-END-DAY' */}
						<TextField
							type="number"
							InputProps={{ inputProps: { min: 0, max: 60, step: 15 } }}
							variant="filled"
							label="Duration (min)"
							fullWidth
							{...register('durationMinutes')}
							error={!!errors.durationMinutes}
						/>
					</div>
					<FormControl {...register('activityTags')}>
						<Select
							labelId="activityTags"
							id="activityTags"
							multiple
							value={newActivity.tag}
							onChange={handleActivityTags}
							input={<OutlinedInput id="activityTags" label="Activities" />}
							renderValue={(selected) => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{selected.map((value: string) => (
										<Chip key={value} label={value} />
									))}
								</Box>
							)}
							MenuProps={MenuProps}
						>
							{tags.map((tag) => (
								<MenuItem
									key={tag}
									value={tag}
									style={getStyles(tag, newActivity.tag, theme)}
								>
									{tag}
								</MenuItem>
							))}
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
