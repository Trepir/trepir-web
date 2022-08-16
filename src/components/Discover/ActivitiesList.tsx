import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { selectFilteredActivities } from '../../app/reducers/mapSlice';
import Activity from './Activity';

function ActivitiesList({ setSelectedActivity }: any) {
	const activities = useSelector(selectFilteredActivities);
	console.log(activities);
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