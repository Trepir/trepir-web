import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface NewTravelState {
	travelType: string;
	departureLocation: any;
	arrivalLocation: any;
	departureDate: string;
	flightNumber: string;
}

const initialState: NewTravelState = {
	travelType: 'idle',
	departureLocation: null,
	arrivalLocation: null,
	departureDate: 'idle',
	flightNumber: 'idle',
};

export const createTravelSlice = createSlice({
	name: 'newTravel',
	initialState,
	reducers: {
		changeTravelType: (state, action: PayloadAction<any>) => {
			state.travelType = action.payload;
		},
		changeTravelDepartureDate: (state, action: PayloadAction<any>) => {
			state.departureDate = action.payload;
		},
		submitTravelDepartureLocation: (state, action: PayloadAction<any>) => {
			state.departureLocation = action.payload;
		},
		submitTravelArrivalLocation: (state, action: PayloadAction<any>) => {
			state.arrivalLocation = action.payload;
		},
		changeAccommodationStartDate: (state, action: PayloadAction<any>) => {
			state.departureDate = action.payload;
		},
		submitFlightNumber: (state, action: PayloadAction<any>) => {
			state.flightNumber = action.payload;
		},
	},
});

export const {
	changeTravelType,
	changeTravelDepartureDate,
	submitTravelDepartureLocation,
	submitTravelArrivalLocation,
	submitFlightNumber,
} = createTravelSlice.actions;

export const selectNewTravel = (state: RootState) => state.newTravel;

export default createTravelSlice.reducer;
