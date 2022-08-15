import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coords } from '../../types/MapTypes';
import { RootState } from '../store';

export interface mapState {
	mapCenter: Coords;
	panCoords: Coords | null;
	activites: any[] | null;
	markers: any[] | null;
}

const initialState: mapState = {
	mapCenter: {
		lat: 41.385063,
		lng: 2.173404,
	},
	panCoords: null,
	activites: null,
	markers: null,
};

export const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setMapCenter: (state, action: PayloadAction<Coords>) => {
			state.mapCenter = action.payload;
		},
		setMapPan: (state, action: PayloadAction<Coords>) => {
			state.panCoords = action.payload;
		},
	},
});

export const { setMapCenter, setMapPan } = mapSlice.actions;

export const selectMapCenter = (state: RootState) => state.map.mapCenter;
export const selectPanCoords = (state: RootState) => state.map.panCoords;

export default mapSlice.reducer;
