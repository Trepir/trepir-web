import { Box, Typography } from '@mui/material';
import Activity from './Activity';

function ActivitiesList({ setSelectedActivity, activities, title }: any) {
	return (
		<div>
			{activities.length ? (
				<>
					<Typography variant="h5" style={{ alignSelf: 'flex-start' }}>
						{title}:
					</Typography>
					<Box
						sx={{
							display: 'flex',
							gap: 2,
							overflowX: 'scroll',
							padding: '20px 0 0 6px',
							width: '48vw',
							height: 180,
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
