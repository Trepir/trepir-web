import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: any = { userTrips: [] };

export const tripListSlice = createSlice({
	name: 'tripList',
	initialState,
	reducers: {
		addTrip: (state, action: PayloadAction<any>) => {
			state.userTrips.push(action.payload);
		},
		addAllTrips: (state, action: PayloadAction<any>) => {
			console.log('reducer', [...action.payload]);
			state.userTrips = action.payload;
			console.log('state', state);
		},
	},
});

export const { addTrip, addAllTrips } = tripListSlice.actions;
export const selectTripList = (state: RootState) => state.tripList;

export default tripListSlice.reducer;
