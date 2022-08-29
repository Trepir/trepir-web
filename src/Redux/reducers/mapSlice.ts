import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coords } from '../../types/MapTypes';
import { RootState } from '../store';

export interface mapState {
	page: 'discover' | 'dashboard' | 'playground' | null;
	panCoords: Coords | null;
	viewportCoords: any;
	prevViewportCoords: any;
	markers: Coords[] | null;
}

const initialState: mapState = {
	page: null,
	panCoords: null,
	viewportCoords: null,
	prevViewportCoords: null,
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
		setMarkers: (state, action: PayloadAction<any>) => {
			state.markers = action.payload;
		},
		setSpecificMarkers: (state, action: PayloadAction<any>) => {
			state.markers = [...action.payload];
		},
		resetMap: (
			state,
			action: PayloadAction<'discover' | 'dashboard' | 'playground' | null>
		) => {
			state.page = action.payload;
			state.panCoords = null;
			state.viewportCoords = null;
			state.prevViewportCoords = null;
			state.markers = [];
		},
	},
});

export const {
	setMapPan,
	setMapViewport,
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
export const selectMarkers = (state: RootState) => state.map.markers;

export default mapSlice.reducer;
