import { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DragDropContext } from 'react-beautiful-dnd';
import EditTripActivitiesContainer from './EditTripActivitiesContainer';
import SelectedTrip from './SelectedTrip';
import mock from '../../../utils/mockActivities';
import { tripDateFormatter } from '../../../utils/dateUtils';

//  Your Saved Activities
const favoritedActivities = {
	ActivitiesList: mock,
};

//  Your Trip Days
// const tripDays = {
// 	Mon: [],
// 	Tues: [],
// 	Wed: [],
// 	Thurs: [],
// 	Fri: [],
// };

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
	console.log(result);
	if (!result.destination) return;
	const { source, destination } = result;

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
		const destActivities = days[destination.droppableId];
		//	remove act from source, and add to dest
		const [removed] = sourceActivities.splice(source.index, 1);
		destActivities.splice(destination.index, 0, removed);
		//	set the days
		console.log('destdropid:', destination.droppableId);
		setDays({
			...days,
			[destination.droppableId]: destActivities,
		});
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

		const [removed] = sourceActivities.splice(source.index, 1);
		destActivities.splice(destination.index, 0, removed);

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

function EditTripPage() {
	const tripDetails = {
		id: 'cl6yzxnjx03885zuohu5zw6kk',
		createdAt: '2022-08-18T12:05:46.749Z',
		userId: 'cl6yvhyd600475zuop6gba6xg',
		startDate: '2023-07-02T00:00:00.000Z',
		endDate: '2023-07-06T00:00:00.000Z',
		name: 'Euro Trip - Barcelona',
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

	const dateList = tripDateFormatter(
		tripDetails.startDate,
		tripDetails.tripDay.length
	);
	//  eslint-disable-next-line
	const tripDayMap: any = {};
	//  eslint-disable-next-line
	tripDetails.tripDay.forEach((day: any) => {
		tripDayMap[dateList[day.dayIndex]] = day.tripDayActivities;
	});
	console.log(tripDayMap);
	//  eslint-disable-next-line
	const [savedActivities, setSavedActivities] = useState(favoritedActivities);
	//  eslint-disable-next-line
	const [days, setDays] = useState(tripDayMap);

	return (
		<>
			<div>
				{tripDetails.name ? (
					<Typography variant="h2">{tripDetails.name}</Typography>
				) : null}
			</div>

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
