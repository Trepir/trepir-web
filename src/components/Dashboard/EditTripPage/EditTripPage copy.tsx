import { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
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

//	Handle All Of The Drag Logic
const onDragEnd = (
	result: any,
	days: any,
	setDays: any,
	savedActivities: any,
	setSavedActivities: any
) => {
	//	/////////FAIL CHECKS/////////////////////
	//	CHECK: DROPPING AT A DROPPPABLE LOCATION
	if (!result.destination) return;
	const { source, destination } = result;
	console.log('source:', source);
	console.log('destination:', destination);

	//	IF SOURCE & DEST IS SAVED ACTIVITIES
	if (
		source.droppableId === 'favoritedActivities' &&
		destination.droppableId === 'favoritedActivities'
	) {
		console.log('Dont Drop Here');
		return;
	}

	//	IF SOURCE IS DAY && DEST IS SAVED ACTIVITIES
	if (
		source.droppableId !== 'favoritedActivities' &&
		destination.droppableId === 'favoritedActivities'
	) {
		console.log('Dont Drop Here');
		return;
	}
	//	/////////SUCCESS/////////////////////

	//	IF SOURCE=SAVED ACTIVITES & DEST=DAY
	if (source.droppableId === 'favoritedActivities') {
		//	identify source and dest activities
		const sourceActivities = [...savedActivities.ActivitiesList];
		console.log('source before:', sourceActivities);
		const destActivities = days[destination.droppableId];
		//	remove act from source, and add to dest
		const [removed] = sourceActivities.splice(source.index, 1);
		console.log('source after:', sourceActivities);
		destActivities.splice(destination.index, 0, removed);
		//	set the days
		setDays({
			...days,
			[destination.droppableId]: destActivities,
		});
		console.log('source dID', source.droppableId);
		//	set your act list
		setSavedActivities({
			// ...savedActivities,
			// [source.droppableId]: sourceActivities,
			ActivitiesList: sourceActivities,
		});

		return;
	}

	//	IF SOURCE & DEST ARE DIFFERENT DAYS
	if (
		source.droppableId !== 'favoritedActivities' &&
		source.droppableId !== destination.droppableId
	) {
		//	identify source activities
		const sourceActivities = days[source.droppableId];

		//	identify destactivities
		const destActivities = days[destination.droppableId];
		console.log('sourceItemsBefore:', sourceActivities);
		console.log('destItemsBefore:', destActivities);

		const [removed] = sourceActivities.splice(source.index, 1);
		destActivities.splice(destination.index, 0, removed);

		console.log('sourceItemsAfter:', sourceActivities);
		console.log('destItemsAfter:', destActivities);
		setDays({
			...days,
			[source.droppableId]: sourceActivities,
			[destination.droppableId]: destActivities,
		});
		return;
	}
	//	IF SOURCE & DEST ARE THE SAME DAY
	if (
		source.droppableId !== 'favoritedActivities' &&
		source.droppableId === destination.droppableId
	) {
		const activities = days[source.droppableId];
		const [removed] = activities.splice(source.index, 1);
		activities.splice(destination.index, 0, removed);
		setDays({
			...days,
			[source.droppableId]: activities,
		});
	}
};

console.log('trip days:', tripDays);

function EditTripPage() {
	const tripDetails = {
		id: 'cl6yzxnjx03885zuohu5zw6kk',
		createdAt: '2022-08-18T12:05:46.749Z',
		userId: 'cl6yvhyd600475zuop6gba6xg',
		startDate: '2023-07-02T00:00:00.000Z',
		endDate: '2023-07-06T00:00:00.000Z',
		name: 'Kern River',
		tripDay: [
			{
				id: 'cl6yzxnjx03895zuo323oyknm',
				dayIndex: 0,
				tripId: 'cl6yzxnjx03885zuohu5zw6kk',
				tripDayActivities: [],
			},
			{
				id: 'cl6yzxnjx03905zuokpfa6lds',
				dayIndex: 1,
				tripId: 'cl6yzxnjx03885zuohu5zw6kk',
				tripDayActivities: [],
			},
			{
				id: 'cl6yzxnjx03915zuo0m6xq9ud',
				dayIndex: 2,
				tripId: 'cl6yzxnjx03885zuohu5zw6kk',
				tripDayActivities: [],
			},
			{
				id: 'cl6yzxnjx03925zuoifyycuj3',
				dayIndex: 3,
				tripId: 'cl6yzxnjx03885zuohu5zw6kk',
				tripDayActivities: [],
			},
			{
				id: 'cl6yzxnjx03935zuoochl05rs',
				dayIndex: 4,
				tripId: 'cl6yzxnjx03885zuohu5zw6kk',
				tripDayActivities: [],
			},
		],
	};
	//  eslint-disable-next-line
	const [savedActivities, setSavedActivities] = useState(favoritedActivities);
	//  eslint-disable-next-line
	const [days, setDays] = useState(tripDays);

	return (
		<>
			<div>{tripDetails.name ? <h2>{tripDetails.name}</h2> : null}</div>

			<DragDropContext
				onDragEnd={(result) =>
					onDragEnd(result, days, setDays, savedActivities, setSavedActivities)
				}
			>
				<Box
					style={{
						display: 'flex',
						justifyContent: 'center',
						width: '100vw',
					}}
				>
					<SelectedTrip days={days} />
					<EditTripActivitiesContainer savedActivities={savedActivities} />
				</Box>
			</DragDropContext>
			<Button component={Link} to="../tripplan">
				hi
			</Button>
		</>
	);
}

export default EditTripPage;
