import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Button, Divider, Paper } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import EditTripActivitiesContainer from './EditTripActivitiesContainer';
import SelectedTrip from './SelectedTrip';
// import mock from '../../../utils/mockActivities';
import { tripDateFormatter } from '../../../utils/dateUtils';
import {
	selectTripDetails,
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
import { getUserFavoriteActivities } from '../../../features/createActivity/favoriteActivityService';
import { selectUid } from '../../../app/reducers/authSlice';

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

	//	/////////FAIL CHECKS/////////////////////
	//	CHECK: DROPPING AT A DROPPPABLE LOCATION
	if (!result.destination) {
		//	//WORKING HERE///////////
		const dayActivities = [...days[source.droppableId]];
		const tripDayActivity = dayActivities[source.index];
		const tripDayActivityId = tripDayActivity.id;
		//	//WORKING HERE///////////
		//	set day before awaiting
		dayActivities.splice(source.index, 1);
		setDays({
			...days,
			[source.droppableId]: dayActivities,
		});
		await removeActivityFromTrip(tripDayActivityId);
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
		//	//WORKING HERE///////////

		dayActivities.splice(source.index, 1);
		setDays({
			...days,
			[source.droppableId]: dayActivities,
		});
		await removeActivityFromTrip(tripDayActivityId);
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
		//	///////////////FIRST SET STATE QUICKLY/////////////////////
		const sourceActivitiesQuick = [...savedActivities.ActivitiesList];
		const destActivitiesQuick = [...days[destination.droppableId]];
		const [removedQuick] = sourceActivitiesQuick.splice(source.index, 1);
		destActivitiesQuick.splice(destination.index, 0, removedQuick);
		sourceActivitiesQuick.push(removedQuick);
		//	///////////////FIRST SET STATE QUICKLY/////////////////////

		//	///////////////WORKING HERE BACKEND LOGIC/////////////////////

		const sourceActivities = [...savedActivities.ActivitiesList];
		const destActivities = [...days[destination.droppableId]];
		const [removed] = sourceActivities.splice(source.index, 1);
		const removedCopy = { ...removed };
		const addedActivityId = removedCopy.id;
		const tripDayId = dayIdMap[destination.droppableId];
		const { index } = destination;
		console.log(destActivities);
		//	///////////////WORKING HERE BACKEND LOGIC/////////////////////
		// BEFORE CALLING BE QUICKLY SET STATE
		setDays({
			...days,
			[destination.droppableId]: destActivitiesQuick,
		});
		//	set your act list
		setSavedActivities({
			ActivitiesList: sourceActivitiesQuick,
		});
		// UPON RESPONSE SET AGAIN

		const updatedDay = await addActivityToTrip(
			tripDayId,
			addedActivityId,
			index
		);
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
			[destination.droppableId]: updatedDay,
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
		//	QUICKLY SET STATE FOR ANIMATION/////
		//	identify source activities
		const sourceActivitiesQuick = [...days[source.droppableId]];

		//	identify destactivities
		const destActivitiesQuick = [...days[destination.droppableId]];

		const [removedQuick] = sourceActivitiesQuick.splice(source.index, 1);
		destActivitiesQuick.splice(destination.index, 0, removedQuick);

		//	QUICKLY SET STATE FOR ANIMATION/////

		// WORKING HERE FOR BACKEND LOGIC//////////////////
		//	identify source activities (and remove from source)
		const sourceActivities = [...days[source.droppableId]];
		const tripDayActivity = sourceActivities[source.index];
		const tripDayActivityId = tripDayActivity.id;
		console.log(tripDayActivity);

		console.log(typeof tripDayActivityId);

		//	identify destactivities
		const destActivities = [...days[destination.droppableId]];

		//	1. remove
		const [removed] = sourceActivities.splice(source.index, 1);
		//	If its a travel event or accomodation then return
		if (removed.travelEvent || removed.accommodation) return;
		// 2. add
		const removedCopy = { ...removed };
		// check if activity or travel event
		const addedActivityId = removedCopy.dayActivity.activityId;

		const tripDayId = dayIdMap[destination.droppableId];
		const { index } = destination;

		// BEFORE CALLING BE QUICKLY SET STATE
		setDays({
			...days,
			[source.droppableId]: sourceActivitiesQuick,
			[destination.droppableId]: destActivitiesQuick,
		});

		await removeActivityFromTrip(tripDayActivityId);
		const updatedDay = await addActivityToTrip(
			tripDayId,
			addedActivityId,
			index
		);

		// UPON RESPONSE SET AGAIN

		setDays({
			...days,
			[source.droppableId]: sourceActivities,
			[destination.droppableId]: updatedDay,
		});
		// WORKING HERE FOR BACKEND LOGIC//////////////////
		//	MARKERS
		destActivities.splice(destination.index, 0, removed);
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
		//	///////////////FIRST SET STATE QUICKLY/////////////////////
		const activitiesQuick = [...days[source.droppableId]];
		const [removedQuick] = activitiesQuick.splice(source.index, 1);
		activitiesQuick.splice(destination.index, 0, removedQuick);
		//	///////////////FIRST SET STATE QUICKLY/////////////////////

		//	///////////////WORKING HERE BACKEND LOGIC/////////////////////
		const tripDayId = dayIdMap[destination.droppableId];
		const { index } = destination;
		const dayActivities = [...days[source.droppableId]];
		const tripDayActivity = dayActivities[source.index];
		const tripDayActivityId = tripDayActivity.id;

		// BEFORE CALLING BE QUICKLY SET STATE
		setDays({
			...days,
			[source.droppableId]: activitiesQuick,
		});

		const updatedDay = await reorderTripDay(
			tripDayId,
			tripDayActivityId,
			index
		);

		// UPON RESPONSE SET AGAIN
		setDays({
			...days,
			[source.droppableId]: updatedDay,
		});
		//	///////////////WORKING HERE BACKEND LOGIC/////////////////////
		//	MARKERS
		const activities = [...days[source.droppableId]];
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
	const uid = useSelector(selectUid);
	const tripId: string | null = localStorage.getItem('tripId');
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
			if (tripId?.length) {
				try {
					const fetchTripDetails = await fetch(
						`${BASE_URL}trip/tripById/${tripId}`
					);
					const jsonTripDetails = await fetchTripDetails.json();
					dispatch(setSelectedTrip(jsonTripDetails));
				} catch (e) {
					console.log(e);
				}
			}
		};
		getTripDetails();
	}, [tripId]);
	//	//////////////////2. SET YOUR TRIP DAYS & MARKER STATE /////////////////

	useEffect(() => {
		if (!tripDetails) return;
		const dateList = tripDateFormatter(
			tripDetails.startDate,
			tripDetails.tripDay?.length
		);
		//	///PARSE YOUR TRIP INTO A MAP OF DAYS//////////
		//  eslint-disable-next-line
		const tripDayActivityMap: any = {};
		const tripDayIdMap: any = {};
		//  eslint-disable-next-line
		tripDetails.tripDay?.forEach((day: any) => {
			const tripDayCopy = [...day.tripDayActivities];
			const sortedActivities = sortDay(tripDayCopy);
			tripDayActivityMap[dateList[day.dayIndex]] = sortedActivities;
			tripDayIdMap[dateList[day.dayIndex]] = day.id;
		});

		//	////////////////////////////////////////////////
		setDays(tripDayActivityMap);
		setDayIdMap(tripDayIdMap);
		//	//////PUT INITIAL MARKER STATE LOGIC HERE////////////
		//  eslint-disable-next-line
		const markers = parseMarkersDashboard(tripDayActivityMap);
		setLocalMarkers(markers);
		//	////////////////////////////////////////////////////
	}, [tripDetails]);

	//	//////////////////3. SET YOUR TRIP ACTIVITIES STATE /////////////////

	useEffect(() => {
		const getActivities = async () => {
			if (uid) {
				const activities = await getUserFavoriteActivities(uid);
				const savedActivityList: any[] = [];
				activities.forEach((activity: any) => {
					if (activity.tripId === tripId) {
						savedActivityList.push(activity.activity);
					}
				});
				setSavedActivities({
					ActivitiesList: savedActivityList,
				});
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
								height: '93vh',
								overflow: 'scroll',
								alignItems: 'center',
								backgroundColor: '#f9f9f9',
							}}
						>
							<Paper
								elevation={0}
								sx={{
									display: 'flex',
									width: '50vw',
									height: 50,
									justifyContent: 'center',
									// gap: 7,
									position: 'absolute',
									// margin: '0 0 0 0',
									// top: 0,
									zIndex: '2',
								}}
							>
								<Button
									disableElevation
									// variant={mapSelected ? 'text' : 'contained'}
									style={
										mapSelected
											? {
													width: '25vw',
													color: 'black',
													backgroundColor: 'white',
													fontWeight: 'bold',
													borderRadius: '0 0 0 0',
											  }
											: {
													width: '25vw',
													color: 'black',
													backgroundColor: '#d1d1d1',
													fontWeight: 'bold',
													borderRadius: '0 20px 0 0',
											  }
									}
									onClick={() => {
										dispatch(setViewingMap(false));
										dispatch(setMapViewport(prevViewport));
									}}
								>
									Activities
								</Button>
								<Button
									disableElevation
									style={
										mapSelected
											? {
													width: '25vw',
													color: 'black',
													backgroundColor: '#d1d1d1',
													fontWeight: 'bold',
													borderRadius: '20px 0 0 0',
											  }
											: {
													width: '25vw',
													color: 'black',
													backgroundColor: 'white',
													fontWeight: 'bold',
													borderRadius: '0 0 0 0',
											  }
									}
									// variant={mapSelected ? 'contained' : 'text'}
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
									<AddEventsControls />
									<Divider style={{ margin: '15.5vh 0 0 0' }} />
									{selectedActivity ? (
										<div style={{ margin: '2vh 0 0 0' }}>
											<ActivityDetails
												setSelectedActivity={setSelectedActivity}
												activity={selectedActivity}
											/>
										</div>
									) : (
										<EditTripActivitiesContainer
											savedActivities={savedActivities}
											setSelectedActivity={setSelectedActivity}
										/>
									)}
								</div>
							)}
						</Box>
					</Box>
				</DragDropContext>
			) : null}
		</>
	);
}

export default EditTripPage;
