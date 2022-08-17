import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { selectTagsApplied } from '../../app/reducers/mapSlice';
import ActivitiesList from './ActivitiesList';
import ActivityDetails from './ActivityDetails';
import FilteredActivitiesList from './FilteredActivitiesList';
import PanSearchGooglePlaces from './PanSearchGooglePlaces';
import TagList from './TagList';

function FilterPage() {
	const tagsApplied = useSelector(selectTagsApplied);
	const [selectedActivity, setSelectedActivity] = useState(false);
	return (
		<Box>
			{selectedActivity ? (
				<ActivityDetails
					setSelectedActivity={setSelectedActivity}
					activity={selectedActivity}
				/>
			) : (
				<>
					<PanSearchGooglePlaces />
					<TagList />
					{tagsApplied.length ? (
						<FilteredActivitiesList setSelectedActivity={setSelectedActivity} />
					) : (
						<ActivitiesList setSelectedActivity={setSelectedActivity} />
					)}
				</>
			)}
		</Box>
	);
}

export default FilterPage;
