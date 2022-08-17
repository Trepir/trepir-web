import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: any = [];

export const tripListSlice = createSlice({
	name: 'tripList',
	initialState,
	reducers: {
		addTrip: (state, action: PayloadAction<any>) => {
			state.push(action.payload);
		},
	},
});

export const { addTrip } = tripListSlice.actions;
export const selectTripList = (state: RootState) => state.tripList;

export default tripListSlice.reducer;
