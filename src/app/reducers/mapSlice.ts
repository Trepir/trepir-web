import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coords } from '../../types/MapTypes';
import { RootState } from '../store';

export interface mapState {
	page: 'discover' | 'dashboard' | null;
	panCoords: Coords | null;
	viewportCoords: any;
	prevViewportCoords: any;
	// activities: any[] | null;
	// tagsApplied: any[];
	// filteredActivities: any[] | null | undefined;
	markers: Coords[] | null;
}

const initialState: mapState = {
	page: null,
	panCoords: null,
	viewportCoords: null,
	prevViewportCoords: null,
	// activities: null,
	// tagsApplied: [],
	// filteredActivities: null,
	markers: [],
};

export const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setMapPan: (state, action: PayloadAction<Coords>) => {
			state.panCoords = action.payload;
		},
		setMapViewport: (state, action: PayloadAction<any>) => {
			state.viewportCoords = action.payload;
			if (action.payload) state.prevViewportCoords = action.payload;
		},
		// setTagsApplied: (state, action: PayloadAction<any>) => {
		// 	//	first check if the tag is already in the array
		// 	const index = state.tagsApplied.indexOf(action.payload);
		// 	if (index === -1) {
		// 		//	if it does not exist, then add it
		// 		state.tagsApplied = [...state.tagsApplied, action.payload];
		// 	} else {
		// 		//	if it does exist, then remove it (without mutating the state)
		// 		state.tagsApplied = [
		// 			...state.tagsApplied.slice(0, index),
		// 			...state.tagsApplied.slice(index + 1),
		// 		];
		// 	}
		// },
		// setActivities: (state, action) => {
		// 	state.activities = action.payload;
		// 	state.filteredActivities = action.payload;
		// },
		// setFilteredActivities: (state) => {
		// 	state.filteredActivities = state.activities?.filter((activity) => {
		// 		let result: boolean = true;
		// 		state.tagsApplied.forEach((tag) => {
		// 			if (activity.tags.includes(tag)) return;
		// 			result = false;
		// 		});
		// 		return result;
		// 	});
		// },
		setMarkers: (state, action: PayloadAction<any>) => {
			state.markers = action.payload;
		},
		setSpecificMarkers: (state, action: PayloadAction<any>) => {
			state.markers = [...action.payload];
		},
		resetMap: (
			state,
			action: PayloadAction<'discover' | 'dashboard' | null>
		) => {
			state.page = action.payload;
			state.panCoords = null;
			state.viewportCoords = null;
			state.prevViewportCoords = null;
			// state.activities = null;
			// state.tagsApplied = [];
			// state.filteredActivities = null;
			state.markers = [];
		},
	},
});

export const {
	setMapPan,
	setMapViewport,
	// setTagsApplied,
	// setActivities,
	// setFilteredActivities,
	setMarkers,
	setSpecificMarkers,
	resetMap,
} = mapSlice.actions;

export const selectPage = (state: RootState) => state.map.page;

export const selectPanCoords = (state: RootState) => state.map.panCoords;
export const selectViewportCoords = (state: RootState) =>
	state.map.viewportCoords;
export const selectPrevViewportCoords = (state: RootState) =>
	state.map.prevViewportCoords;
// export const selectActivities = (state: RootState) => state.map.activities;
// export const selectTagsApplied = (state: RootState) => state.map.tagsApplied;
// export const selectFilteredActivities = (state: RootState) =>
// 	state.map.filteredActivities;
export const selectMarkers = (state: RootState) => state.map.markers;

export default mapSlice.reducer;
