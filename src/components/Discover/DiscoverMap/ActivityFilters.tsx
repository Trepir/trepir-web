import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Divider, Typography } from '@mui/material';
import { selectTagsApplied } from '../../../redux/reducers/discoverSlice';
import ActivitiesListContainer from './ActivitiesListContainer';
import ActivityDetails from '../../Shared/ActivityDetails';
import FilteredActivitiesList from './FilteredActivitiesList';
import PanSearchGooglePlaces from './PanGoogleSearch';
import TagList from './TagList';

function FilterPage() {
	const tagsApplied = useSelector(selectTagsApplied);
	const [selectedActivity, setSelectedActivity] = useState(false);

	return (
		<Box>
			<div
				style={{
					position: 'fixed',
					top: '6.95vh',
					width: '48.5vw',
					height: '25vh',
					backgroundColor: 'white',
					zIndex: 1,
					display: 'flex',
					flexDirection: 'column',
					gap: 20,
				}}
			>
				<Typography
					variant="h4"
					style={{ margin: '20px 0 0 0', fontWeight: 'bold' }}
				>
					Activities
				</Typography>
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
						style={{ borderRadius: 18, width: 115, height: 42 }}
					>
						Search
					</Button>
				</Box>
				<TagList />
				<Divider style={{ width: '48.3vw' }} />
			</div>
			{selectedActivity ? (
				<div>
					<div style={{ height: '25vh' }}>spacer</div>
					<ActivityDetails
						setSelectedActivity={setSelectedActivity}
						activity={selectedActivity}
					/>
				</div>
			) : (
				<div>
					{tagsApplied.length ? (
						<FilteredActivitiesList setSelectedActivity={setSelectedActivity} />
					) : (
						<ActivitiesListContainer
							setSelectedActivity={setSelectedActivity}
						/>
					)}
				</div>
			)}
		</Box>
	);
}

export default FilterPage;
