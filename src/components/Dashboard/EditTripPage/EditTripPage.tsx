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
import { parseMarkers } from '../../../utils/mapUtils';
import {
	setMapViewport,
	setSpecificMarkers,
} from '../../../app/reducers/mapSlice';
import { getViewportWithId } from '../../../utils/googleMaps/googleService';

//	Handle All Of The Drag Logic
const onDragEnd = (
	result: any,
	days: any,
	setDays: any,
	savedActivities: any,
	setSavedActivities: any,
	setLocalMarkers: any
) => {
	const { source, destination } = result;
	//	/////////FAIL CHECKS/////////////////////
	//	CHECK: DROPPING AT A DROPPPABLE LOCATION
	console.log(result);
	if (!result.destination) {
		const dayActivities = [...days[source.droppableId]];

		dayActivities.splice(source.index, 1);
		setDays({
			...days,
			[source.droppableId]: dayActivities,
		});
		//	MARKERS
		const newMarkers = parseMarkers({
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

		dayActivities.splice(source.index, 1);
		setDays({
			...days,
			[source.droppableId]: dayActivities,
		});
		//	MARKERS
		const newMarkers = parseMarkers({
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
		const removedCopy = { ...removed, id: removed.id.concat('x') };
		//	add the activity that was removed to the dest activities
		destActivities.splice(destination.index, 0, removed);
		// add the copy of the removed activity, with a new id, to the source activities
		sourceActivities.push(removedCopy);
		//	set the days
		setDays({
			...days,
			[destination.droppableId]: destActivities,
		});
		//	set your act list
		setSavedActivities({
			ActivitiesList: sourceActivities,
		});
		//	MARKERS
		const newMarkers = parseMarkers({
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

		const [removed] = sourceActivities.splice(source.index, 1);
		destActivities.splice(destination.index, 0, removed);

		setDays({
			...days,
			[source.droppableId]: sourceActivities,
			[destination.droppableId]: destActivities,
		});
		//	MARKERS
		const newMarkers = parseMarkers({
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
		const activities = [...days[source.droppableId]];
		const [removed] = activities.splice(source.index, 1);
		activities.splice(destination.index, 0, removed);
		setDays({
			...days,
			[source.droppableId]: activities,
		});
		//	MARKERS
		const newMarkers = parseMarkers({
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
	const [localMarkers, setLocalMarkers] = useState(null);

	//	MAP CONTROL
	const [mapSelected, setMapSelected] = useState(false);
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
		const tripDayMap: any = {};
		//  eslint-disable-next-line
		tripDetails.tripDay.forEach((day: any) => {
			tripDayMap[dateList[day.dayIndex]] = day.tripDayActivities;
		});
		//	////////////////////////////////////////////////
		setDays(tripDayMap);
		//	//////PUT INITIAL MARKER STATE LOGIC HERE////////////
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
							setLocalMarkers
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
								<Button onClick={() => setMapSelected(false)}>
									Activities
								</Button>
								<Button onClick={() => setMapSelected(true)}>Map</Button>
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
