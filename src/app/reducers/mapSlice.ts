import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coords } from '../../types/MapTypes';
import { RootState } from '../store';

export interface mapState {
	panCoords: Coords | null;
	viewportCoords: any;
	activities: any[] | null;
	tagsApplied: any[];
	filteredActivities: any[] | null | undefined;
	markers: Coords[] | null;
}

const initialState: mapState = {
	panCoords: null,
	viewportCoords: null,
	activities: null,
	tagsApplied: [],
	filteredActivities: null,
	markers: [],
};

export const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setMapViewport: (state, action: PayloadAction<any>) => {
			state.viewportCoords = action.payload;
		},
		setTagsApplied: (state, action: PayloadAction<any>) => {
			//	first check if the tag is already in the array
			const index = state.tagsApplied.indexOf(action.payload);
			if (index === -1) {
				//	if it does not exist, then add it
				state.tagsApplied = [...state.tagsApplied, action.payload];
			} else {
				//	if it does exist, then remove it (without mutating the state)
				state.tagsApplied = [
					...state.tagsApplied.slice(0, index),
					...state.tagsApplied.slice(index + 1),
				];
			}
		},
		setActivities: (state, action) => {
			state.activities = action.payload;
			state.filteredActivities = action.payload;
		},
		setFilteredActivities: (state) => {
			state.filteredActivities = state.activities?.filter((activity) => {
				let result: boolean = true;
				state.tagsApplied.forEach((tag) => {
					if (activity.tags.includes(tag)) return;
					result = false;
				});
				return result;
			});
		},
		setMarkers: (state) => {
			const markers: Coords[] = [];
			state.filteredActivities?.forEach((activity) =>
				markers.push({
					lat: activity.location.latitude,
					lng: activity.location.longitude,
				})
			);
			state.markers = markers;
		},
		setOneMarker: (state, action: PayloadAction<Coords>) => {
			state.markers = [action.payload];
		},
	},
});

export const {
	setMapViewport,
	setTagsApplied,
	setActivities,
	setFilteredActivities,
	setMarkers,
	setOneMarker,
} = mapSlice.actions;

export const selectViewportCoords = (state: RootState) =>
	state.map.viewportCoords;
export const selectActivities = (state: RootState) => state.map.activities;
export const selectTagsApplied = (state: RootState) => state.map.tagsApplied;
export const selectFilteredActivities = (state: RootState) =>
	state.map.filteredActivities;
export const selectMarkers = (state: RootState) => state.map.markers;

export default mapSlice.reducer;
