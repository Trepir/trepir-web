import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
	selectFilteredActivities,
	selectTagsApplied,
} from '../../app/reducers/discoverSlice';
import Activity from './Activity';
import { parseMarkersDiscover } from '../../utils/mapUtils';
import { setMarkers } from '../../app/reducers/mapSlice';

function FilteredActivitiesList({ setSelectedActivity }: any) {
	const dispatch = useDispatch();
	const activities = useSelector(selectFilteredActivities);
	const appliedTags = useSelector(selectTagsApplied);

	useEffect(() => {
		if (!activities) return;
		const markers = parseMarkersDiscover(activities);
		dispatch(setMarkers(markers));
	}, [activities]);
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
				{appliedTags}:
			</Typography>
			<Box
				sx={{
					display: 'flex',
					// flexDirection: 'column',
					flexWrap: 'wrap',
					gap: 2,
					// overflow: 'scroll',
					height: '20vh',
				}}
			>
				{activities?.map((activity: any) => (
					<Activity
						key={activity.id}
						activity={activity}
						setSelectedActivity={setSelectedActivity}
					/>
				))}
			</Box>
		</Box>
	);
}

export default FilteredActivitiesList;
