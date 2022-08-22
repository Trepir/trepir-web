import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface selectedTripState {
	name: string;
	placeDetails: any;
	startDate: string;
	endDate: string;
}

const initialState: any = { userTrips: [] };

export const tripListSlice = createSlice({
	name: 'tripList',
	initialState,
	reducers: {
		addTrip: (state, action: PayloadAction<any>) => {
			state.userTrips.push(action.payload);
		},
		addAllTrips: (state, action: PayloadAction<any>) => {
			state.userTrips = action.payload;
		},
	},
});

export const { addTrip, addAllTrips } = tripListSlice.actions;
export const selectTripList = (state: RootState) => state.tripList;

export default tripListSlice.reducer;
