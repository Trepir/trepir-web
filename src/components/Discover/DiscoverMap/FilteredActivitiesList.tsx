import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
	selectFilteredActivities,
	selectTagsApplied,
} from '../../../Redux/reducers/discoverSlice';
import ActivityCard from '../../Shared/Cards/ActivityCard';
import { parseMarkersDiscover } from '../../../utils/mapUtils';
import { setMarkers } from '../../../Redux/reducers/mapSlice';

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
				margin: '25vh 0 0 0',

				// height: '25vh',
			}}
		>
			<Typography
				variant="h5"
				noWrap
				style={{ alignSelf: 'flex-start', width: '48vw' }}
			>
				{appliedTags.map((tag) => (
					<>{tag}, </>
				))}
			</Typography>
			<Box
				sx={{
					// backgroundColor: 'pink',
					display: 'flex',
					width: '48vw',
					padding: '20px 0 0 6px',
					flexWrap: 'wrap',
					gap: 2,
				}}
			>
				{activities?.map((activity: any) => (
					<ActivityCard
						key={activity.id}
						activity={activity}
						setSelectedActivity={setSelectedActivity}
						dragging={false}
					/>
				))}
			</Box>
		</Box>
	);
}

export default FilteredActivitiesList;
