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
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import TripLocationSearch from '../TripForm/TripLocationSearch';

import {
	selectNewActivity,
	submitActivityDescription,
	submitActivityDurationHours,
	submitActivityDurationMinutes,
	submitActivityName,
	submitActivityTag,
} from '../../../features/createActivity/createActivitySlice';
import { createActivity } from '../../../features/createActivity/createActivityService';
import { selectUid } from '../../../app/reducers/authSlice';
// import { selectUid } from '../../../app/reducers/authSlice';

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
	activityName: yup.string().required('Please add a name'),
	activityDescription: yup.string().required('Please add a short description'),
	durationHours: yup.number().required('Please add an approximate duration'),
	durationMinutes: yup.number().required('Please add an approximate duration'),
	activityTags: yup.mixed().required('Please add up to 3 tags'),
});

type Props = {
	handleCloseActivity: () => void;
};

function CreateActivityForm(props: Props) {
	const { handleCloseActivity } = props;
	const uid: string | null = useSelector(selectUid);
	const newActivity: any = useAppSelector(selectNewActivity);
	const theme = useTheme();
	const alertRef: React.MutableRefObject<boolean> = useRef(false);
	const dispatch = useAppDispatch();

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
	};

	const onSubmit = async (data: any) => {
		console.log('in');
		const isValid = await AddActivitySchema.isValid(data);
		if (!isValid || !newActivity.location) {
			alertRef.current = true;
		}
		if (isValid && newActivity.location) {
			console.log('clicked');
			const {
				activityName,
				activityDescription,
				durationHours,
				durationMinutes,
			} = data;
			await dispatch(submitActivityName(activityName));
			await dispatch(submitActivityDescription(activityDescription));
			await dispatch(submitActivityDurationHours(Number(durationHours)));
			await dispatch(submitActivityDurationMinutes(Number(durationMinutes)));
			console.log('idle?', newActivity);
			if (uid) {
				const createdActivity = await createActivity(data, newActivity, uid);
				console.log('response', createdActivity);
				handleCloseActivity();
			}
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={2} className="modal-form-container">
					<h2>Create an activity</h2>
					<TextField
						id="activityName"
						label="Name"
						type="text"
						sx={{ width: '50%' }}
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
						sx={{ width: '50%' }}
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
							label="Tags"
							multiple
							value={newActivity.tag}
							onChange={handleActivityTags}
							input={<OutlinedInput id="activityTags" label="Activities" />}
							sx={{ width: '100%' }}
							renderValue={(selected) => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{selected.map((value: string) => (
										<Chip
											key={value}
											label={value}
											sx={{ width: 70, backgroundColor: '#ECCA72' }}
										/>
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
