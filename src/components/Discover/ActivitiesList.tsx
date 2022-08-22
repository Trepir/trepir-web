import { Box, Typography } from '@mui/material';
import Activity from './Activity';

function ActivitiesList({ setSelectedActivity, activities, title }: any) {
	return (
		<div>
			{activities.length ? (
				<>
					<Typography variant="h5" style={{ alignSelf: 'flex-start' }}>
						{title}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							gap: 2,
							overflowX: 'scroll',
							height: '23vh',
						}}
					>
						{activities?.map((activity: any) => (
							<Activity
								activity={activity}
								setSelectedActivity={setSelectedActivity}
							/>
						))}
					</Box>
				</>
			) : null}
		</div>
	);
}

export default ActivitiesList;
