import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import {
	selectActivities,
	selectViewportCoords,
	setActivites,
} from '../../app/reducers/mapSlice';
import Activity from './Activity';
import { getActivitiesByCoordinates } from '../../features/createActivity/createActivityService';

function ActivitiesList({ setSelectedActivity }: any) {
	const dispatch = useDispatch();
	const viewportCoords: any = useSelector(selectViewportCoords);
	const activities = useSelector(selectActivities);
	useEffect(() => {
		const getActivities = async () => {
			if (!viewportCoords) return;
			const activityListByCoord = await getActivitiesByCoordinates(
				viewportCoords
			);

			console.log('Place activities', activityListByCoord);
			dispatch(setActivites(activityListByCoord));
		};
		getActivities();
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
				{activities
					? activities?.map((activity) => (
							<Activity
								activity={activity}
								setSelectedActivity={setSelectedActivity}
							/>
					  ))
					: null}
			</Box>
		</Box>
	);
}

export default ActivitiesList;
