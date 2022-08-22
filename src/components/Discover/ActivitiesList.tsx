import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { selectViewportCoords, setMarkers } from '../../app/reducers/mapSlice';
import {
	selectActivities,
	setActivities,
} from '../../app/reducers/discoverSlice';
import Activity from './Activity';
import { getActivitiesByCoordinates } from '../../features/createActivity/createActivityService';
import { parseMapViewport, parseMarkersDiscover } from '../../utils/mapUtils';

function ActivitiesList({ setSelectedActivity }: any) {
	const dispatch = useDispatch();
	const viewportCoords: any = useSelector(selectViewportCoords);
	const activities: any = useSelector(selectActivities);

	useEffect(() => {
		const getActivities = async () => {
			if (!viewportCoords) return;
			//	NOTE: WE DO A FETCH EVERY TIME WE RETURN FROM AN ACTIVITY DETAIL--- MAYBE FIX?
			const parsedViewport = await parseMapViewport(viewportCoords);
			const activityListByCoord = await getActivitiesByCoordinates(
				parsedViewport
			);
			dispatch(setActivities(activityListByCoord));
			const markers = parseMarkersDiscover(activityListByCoord);
			dispatch(setMarkers(markers));
		};
		getActivities();
	}, [viewportCoords]);

	return (
		<Box
			sx={{
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
