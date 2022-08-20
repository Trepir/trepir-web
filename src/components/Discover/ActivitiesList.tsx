import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import {
	selectActivities,
	selectMapCenter,
	setActivites,
} from '../../app/reducers/mapSlice';
import Activity from './Activity';
import { getActivitiesByCoordinates } from '../../features/createActivity/createActivityService';

function ActivitiesList({ setSelectedActivity }: any) {
	const dispatch = useDispatch();
	const mapCenter = useSelector(selectMapCenter);
	const activities = useSelector(selectActivities);
	useEffect(() => {
		console.log('in');
		const getAllActivities = async () => {
			const activityListByCoord = await getActivitiesByCoordinates(mapCenter);
			console.log('Place activities', activityListByCoord);
			dispatch(setActivites(activityListByCoord));
		};
		getAllActivities();
	}, []);
	return (
		<Box
			sx={{
				// backgroundColor: 'pink',
				display: 'flex',
				flexDirection: 'column',
				height: '25vh',
			}}
		>
			<Typography variant="subtitle1" style={{ alignSelf: 'flex-start' }}>
				List Title:
			</Typography>
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					overflow: 'scroll',
					height: '20vh',
				}}
			>
				{activities?.map((activity) => (
					<Activity
						activity={activity}
						setSelectedActivity={setSelectedActivity}
					/>
				))}
			</Box>
		</Box>
	);
}

export default ActivitiesList;
