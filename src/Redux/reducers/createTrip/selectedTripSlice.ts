import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState: any = { tripId: null, tripDetails: null };

export const selectedTripSlice = createSlice({
	name: 'selectedTrip',
	initialState,
	reducers: {
		setSelectedTripId: (state, action: PayloadAction<any>) => {
			state.tripId = action.payload;
		},
		setSelectedTrip: (state, action: PayloadAction<any>) => {
			state.tripDetails = action.payload;
		},
	},
});

export const { setSelectedTripId, setSelectedTrip } = selectedTripSlice.actions;
export const selectTripDetails = (state: RootState) => state.selectedTrip;
export const selectTripId = (state: RootState) => state.selectedTrip.tripId;

export default selectedTripSlice.reducer;
