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
import { parseMapViewport } from '../../utils/mapUtils';

function ActivitiesList({ setSelectedActivity }: any) {
	const dispatch = useDispatch();
	const viewportCoords: any = useSelector(selectViewportCoords);
	const activities: any = useSelector(selectActivities);
	useEffect(() => {
		const getActivities = async () => {
			if (!viewportCoords) return;
			const parsedViewport = await parseMapViewport(viewportCoords);
			const activityListByCoord = await getActivitiesByCoordinates(
				parsedViewport
			);

			console.log('Place activities', activityListByCoord);
			dispatch(setActivites(activityListByCoord));
		};
		getActivities();
	}, [viewportCoords]);
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
					? activities?.map((activity: any) => (
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
