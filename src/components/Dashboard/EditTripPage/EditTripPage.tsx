import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Button, Paper } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import EditTripActivitiesContainer from './EditTripActivitiesContainer';
import SelectedTrip from './SelectedTrip';
// import mock from '../../../utils/mockActivities';
import { tripDateFormatter } from '../../../utils/dateUtils';
import {
	selectTripDetails,
	selectTripId,
	setSelectedTrip,
} from '../../../features/createTrip/selectedTripSlice';
import { BASE_URL } from '../../../features/createTrip/createTripService';
import AddEventsControls from './addEventsControls';
import Map from '../../Discover/Map';
import ActivityDetails from '../../Discover/ActivityDetails';
import { parseMarkersDashboard } from '../../../utils/mapUtils';
import {
	selectPrevViewportCoords,
	setMapViewport,
	setSpecificMarkers,
} from '../../../app/reducers/mapSlice';
import { getViewportWithId } from '../../../utils/googleMaps/googleService';
import {
	selectViewingMap,
	setViewingMap,
} from '../../../app/reducers/dashboardSlice';
import {
	addActivityToTrip,
	removeActivityFromTrip,
	reorderTripDay,
	sortDay,
} from '../../../utils/editTripUtils';

//	Handle All Of The Drag Logic
const onDragEnd = async (
	result: any,
	days: any,
	setDays: any,
	savedActivities: any,
	setSavedActivities: any,
	setLocalMarkers: any,
	dayIdMap: any
) => {
	const { source, destination } = result;
	console.log('source:', source);
	console.log('destination:', destination);

	//	/////////FAIL CHECKS/////////////////////
	//	CHECK: DROPPING AT A DROPPPABLE LOCATION
	if (!result.destination) {
		//	//WORKING HERE///////////
		const dayActivities = [...days[source.droppableId]];
		const tripDayActivity = dayActivities[source.index];
		const tripDayActivityId = tripDayActivity.id;
		await removeActivityFromTrip(tripDayActivityId);
		//	//WORKING HERE///////////

		dayActivities.splice(source.index, 1);
		setDays({
			...days,
			[source.droppableId]: dayActivities,
		});
		//	MARKERS
		const newMarkers = parseMarkersDashboard({
			...days,
			[source.droppableId]: dayActivities,
		});
		setLocalMarkers(newMarkers);
		//	////

		console.log('remove me!');
		return;
	}

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
		const dayActivities = [...days[source.droppableId]];
		//	//WORKING HERE///////////
		const tripDayActivity = dayActivities[source.index];
		const tripDayActivityId = tripDayActivity.id;
		await removeActivityFromTrip(tripDayActivityId);
		//	//WORKING HERE///////////

		dayActivities.splice(source.index, 1);
		setDays({
			...days,
			[source.droppableId]: dayActivities,
		});
		//	MARKERS
		const newMarkers = parseMarkersDashboard({
			...days,
			[source.droppableId]: dayActivities,
		});
		setLocalMarkers(newMarkers);
		//	////

		console.log('remove me!');
		return;
	}
	//	/////////SUCCESS/////////////////////

	//	IF SOURCE=SAVED ACTIVITES & DEST=DAY
	if (source.droppableId === 'favoritedActivities') {
		//	identify source and dest activities
		const sourceActivities = [...savedActivities.ActivitiesList];
		const destActivities = [...days[destination.droppableId]];
		//	remove act from source, and add to dest
		const [removed] = sourceActivities.splice(source.index, 1);
		const removedCopy = { ...removed };
		//	add the activity that was removed to the dest activities
		//	////////////////////	WORKING HERE /////////////////////////////////////
		const addedActivityId = removedCopy.id;
		const tripDayId = dayIdMap[destination.droppableId];
		const { index } = destination;

		const updatedDay = await addActivityToTrip(
			tripDayId,
			addedActivityId,
			index
		);
		console.log('destActivities:', destActivities);
		console.log('updatedDay:', updatedDay);
		//	//////////////////////	WORKING HERE /////////////////////////////////////
		// destActivities.splice(destination.index, 0, removed);
		// add the copy of the removed activity, with a new id, to the source activities
		sourceActivities.push(removedCopy);
		//	set the days
		setDays({
			...days,
			[destination.droppableId]: updatedDay,
		});
		//	set your act list
		setSavedActivities({
			ActivitiesList: sourceActivities,
		});
		//	MARKERS
		const newMarkers = parseMarkersDashboard({
			...days,
			[destination.droppableId]: destActivities,
		});
		setLocalMarkers(newMarkers);
		//	////

		return;
	}

	//	IF SOURCE & DEST ARE DIFFERENT DAYS
	if (
		source.droppableId !== 'favoritedActivities' &&
		source.droppableId !== destination.droppableId
	) {
		//	identify source activities
		const sourceActivities = [...days[source.droppableId]];

		//	identify destactivities
		const destActivities = [...days[destination.droppableId]];

		// WORKING HERE//////////////////
		//	1. remove
		// const activityToRemove = sourceActivities[source.index];
		// const tripDayActivityIdToRemove = activityToRemove.id;
		// await removeActivityFromTrip(tripDayActivityIdToRemove);
		const [removed] = sourceActivities.splice(source.index, 1);
		//	If its a travel event or accomodation then return
		if (removed.travelEvent) return;
		// 2. add
		const removedCopy = { ...removed };
		console.log(removedCopy);
		// check if activity or travel event
		const addedActivityId = removedCopy.dayActivity.activityId;

		console.log(addedActivityId);
		const tripDayId = dayIdMap[destination.droppableId];
		console.log('tripdayId:', tripDayId);
		const { index } = destination;
		console.log(index);
		const updatedDay = await addActivityToTrip(
			tripDayId,
			addedActivityId,
			index
		);

		// WORKING HERE//////////////////

		destActivities.splice(destination.index, 0, removed);

		setDays({
			...days,
			[source.droppableId]: sourceActivities,
			[destination.droppableId]: updatedDay,
		});
		//	MARKERS
		const newMarkers = parseMarkersDashboard({
			...days,
			[source.droppableId]: sourceActivities,
			[destination.droppableId]: destActivities,
		});
		setLocalMarkers(newMarkers);
		//	////
		return;
	}
	//	IF SOURCE & DEST ARE THE SAME DAY
	if (
		source.droppableId !== 'favoritedActivities' &&
		source.droppableId === destination.droppableId
	) {
		console.log('source:', source);
		console.log('dest:', destination);
		//	///////////////WORKING HERE/////////////////////
		const tripDayId = dayIdMap[destination.droppableId];
		const { index } = destination;
		const dayActivities = [...days[source.droppableId]];
		const tripDayActivity = dayActivities[source.index];
		const tripDayActivityId = tripDayActivity.id;
		const updatedDay = await reorderTripDay(
			tripDayId,
			tripDayActivityId,
			index
		);

		//	///////////////WORKING HERE/////////////////////

		const activities = [...days[source.droppableId]];
		// console.log('activities:', activities);

		// const [removed] = activities.splice(source.index, 1);
		// activities.splice(destination.index, 0, removed);
		setDays({
			...days,
			[source.droppableId]: updatedDay,
		});
		//	MARKERS
		const newMarkers = parseMarkersDashboard({
			...days,
			[source.droppableId]: activities,
		});
		setLocalMarkers(newMarkers);
		//	////
	}
};

function EditTripPage() {
	const dispatch = useDispatch();
	const id = useSelector(selectTripId);
	const { tripDetails } = useSelector(selectTripDetails);
	//  eslint-disable-next-line
	const [savedActivities, setSavedActivities] = useState<any>(null);
	//  eslint-disable-next-line
	const [days, setDays] = useState<any>(null);
	//  eslint-disable-next-line
	const [dayIdMap, setDayIdMap] = useState<any>(null);

	//  eslint-disable-next-line
	const [localMarkers, setLocalMarkers] = useState<any>(null);

	//	MAP CONTROL
	const mapSelected = useSelector(selectViewingMap);
	const prevViewport = useSelector(selectPrevViewportCoords);
	// ACTIVITY DETAIL CONTROL
	const [selectedActivity, setSelectedActivity] = useState(false);

	//	//////////////////1. GET DETAILS OF TRIP /////////////////
	useEffect(() => {
		const getTripDetails = async () => {
			//	TRIPID FAIL CHECK DO NOT REMOVE
			//		THIS USEEFFECT NOW WATCH THE TRIPID VALUE AND WILL GET CALLED WHEN IT CHANGES
			if (id) {
				try {
					const fetchTripDetails = await fetch(
						`${BASE_URL}trip/tripById/${id}`
					);
					const jsonTripDetails = await fetchTripDetails.json();
					dispatch(setSelectedTrip(jsonTripDetails));
				} catch (e) {
					console.log(e);
				}
			}
		};
		getTripDetails();
	}, [id]);
	//	//////////////////2. SET YOUR TRIP DAYS & MARKER STATE /////////////////

	useEffect(() => {
		if (!tripDetails) return;
		const dateList = tripDateFormatter(
			tripDetails.startDate,
			tripDetails.tripDay.length
		);
		//	///PARSE YOUR TRIP INTO A MAP OF DAYS//////////
		//  eslint-disable-next-line
		const tripDayActivityMap: any = {};
		const tripDayIdMap: any = {};
		//  eslint-disable-next-line
		tripDetails.tripDay.forEach((day: any) => {
			const tripDayCopy = [...day.tripDayActivities];
			const sortedActivities = sortDay(tripDayCopy);
			tripDayActivityMap[dateList[day.dayIndex]] = sortedActivities;
			tripDayIdMap[dateList[day.dayIndex]] = day.id;
		});

		//	////////////////////////////////////////////////
		setDays(tripDayActivityMap);
		setDayIdMap(tripDayIdMap);
		//	//////PUT INITIAL MARKER STATE LOGIC HERE////////////
		// const markers = parseMarkersDashboard(tripDayActivityMap);
		// setLocalMarkers(markers);
		//	////////////////////////////////////////////////////
	}, [tripDetails]);

	//	//////////////////3. SET YOUR TRIP ACTIVITIES STATE /////////////////

	useEffect(() => {
		const getActivities = async () => {
			try {
				const activities = await fetch(`${BASE_URL}activity/all`);
				const jsonActivities = await activities.json();
				setSavedActivities({
					ActivitiesList: jsonActivities,
				});
			} catch (e) {
				console.log(e);
			}
		};
		getActivities();
	}, []);

	//	/////////////////SET MARKERS ON CHANGE///////////////////////
	useEffect(() => {
		if (!localMarkers) return;
		dispatch(setSpecificMarkers(localMarkers));
	}, [localMarkers]);
	//	///////////////////////////////////////////////////////////////
	//	/////////////////SET INITIAL MAP VIEWPORT///////////////////////
	useEffect(() => {
		const initializeMap = async () => {
			const viewport = await getViewportWithId(tripDetails.googlePlaceId);
			dispatch(setMapViewport(viewport));
		};
		if (!tripDetails) return;
		initializeMap();
	}, [tripDetails]);
	//	///////////////////////////////////////////////////////////////

	return (
		<>
			{/* eslint-disable-next-line */}
			{days && savedActivities ? (
				<DragDropContext
					onDragEnd={(result) =>
						onDragEnd(
							result,
							days,
							setDays,
							savedActivities,
							setSavedActivities,
							setLocalMarkers,
							dayIdMap
						)
					}
				>
					<Box
						style={{
							display: 'flex',
							width: '100vw',
						}}
					>
						<SelectedTrip
							days={days}
							tripName={tripDetails.name}
							setSelectedActivity={setSelectedActivity}
						/>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '50vw',
								alignItems: 'center',
							}}
						>
							<Paper
								sx={{
									display: 'flex',
									width: 250,
									justifyContent: 'center',
									gap: 7,
									position: 'absolute',
									zIndex: '1',
								}}
							>
								<Button
									onClick={() => {
										dispatch(setViewingMap(false));
										dispatch(setMapViewport(prevViewport));
									}}
								>
									Activities
								</Button>
								<Button
									onClick={() => {
										dispatch(setViewingMap(true));
										setSelectedActivity(false);
									}}
								>
									Map
								</Button>
							</Paper>
							{mapSelected ? (
								<Map />
							) : (
								<div>
									{selectedActivity ? (
										<>
											<div style={{ height: '6vh' }} />
											<ActivityDetails
												setSelectedActivity={setSelectedActivity}
												activity={selectedActivity}
											/>
										</>
									) : (
										<>
											<AddEventsControls />
											<EditTripActivitiesContainer
												savedActivities={savedActivities}
												setSelectedActivity={setSelectedActivity}
											/>
										</>
									)}
								</div>
							)}
						</Box>
					</Box>
				</DragDropContext>
			) : (
				<>nope</>
			)}
		</>
	);
}

export default EditTripPage;
