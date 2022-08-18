import { useState } from 'react';
import Box from '@mui/material/Box';
import { DragDropContext } from 'react-beautiful-dnd';
import EditTripActivitiesContainer from './EditTripActivitiesContainer';
import SelectedTrip from './SelectedTrip';
import mock from '../../../utils/mockActivities';

//  Your Saved Activities
const favoritedActivities = {
	ActivitiesList: mock,
};

console.log('favoritedActivities:', favoritedActivities);

//  Your Trip Days
const tripDays = {
	Mon: [],
	Tues: [],
	Wed: [],
	Thurs: [],
	Fri: [],
};

console.log('trip days:', tripDays);

function EditTripPage() {
	//  eslint-disable-next-line
	const [savedActivities, setSavedActivities] = useState(favoritedActivities);

	return (
		<DragDropContext
			onDragEnd={(result) => {
				console.log(result);
			}}
		>
			<Box
				style={{
					display: 'flex',
					justifyContent: 'center',
					width: '100vw',
				}}
			>
				<SelectedTrip />
				<EditTripActivitiesContainer savedActivities={savedActivities} />
			</Box>
		</DragDropContext>
	);
}

export default EditTripPage;
