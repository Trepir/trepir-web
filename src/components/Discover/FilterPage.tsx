import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { selectTagsApplied } from '../../app/reducers/discoverSlice';
import ActivitiesListContainer from './ActivitiesListContainer';
import ActivityDetails from './ActivityDetails';
import FilteredActivitiesList from './FilteredActivitiesList';
import PanSearchGooglePlaces from './PanSearchGooglePlaces';
import TagList from './TagList';

function FilterPage() {
	const tagsApplied = useSelector(selectTagsApplied);
	const [selectedActivity, setSelectedActivity] = useState(false);
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			{selectedActivity ? (
				<ActivityDetails
					setSelectedActivity={setSelectedActivity}
					activity={selectedActivity}
				/>
			) : (
				<>
					<Typography variant="h3">Activities</Typography>
					<Box
						sx={{
							display: 'flex',
							width: '100%',
							// justifyContent: 'center',
							gap: 2,
						}}
					>
						<PanSearchGooglePlaces />
						<Button
							variant="contained"
							style={{ borderRadius: 18, width: 115 }}
						>
							Search
						</Button>
					</Box>
					<TagList />
					{tagsApplied.length ? (
						<FilteredActivitiesList setSelectedActivity={setSelectedActivity} />
					) : (
						<ActivitiesListContainer
							setSelectedActivity={setSelectedActivity}
						/>
					)}
				</>
			)}
		</Box>
	);
}

export default FilterPage;
