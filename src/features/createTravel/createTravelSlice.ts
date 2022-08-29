import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Redux/store';

export interface NewTravelState {
	travelType: string;
	originLocation: any;
	destinationLocation: any;
	departureDate: string;
	flightNumber: string;
}

const initialState: NewTravelState = {
	travelType: 'idle',
	originLocation: null,
	destinationLocation: null,
	departureDate: 'idle',
	flightNumber: 'idle',
};

export const createTravelSlice: any = createSlice({
	name: 'newTravel',
	initialState,
	reducers: {
		changeTravelType: (state, action: PayloadAction<any>) => {
			state.travelType = action.payload;
		},
		changeTravelDepartureDate: (state, action: PayloadAction<any>) => {
			state.departureDate = action.payload;
		},
		submitTravelOriginLocation: (state, action: PayloadAction<any>) => {
			state.originLocation = action.payload;
		},
		submitTravelDestinationLocation: (state, action: PayloadAction<any>) => {
			state.destinationLocation = action.payload;
		},
		submitFlightNumber: (state, action: PayloadAction<any>) => {
			state.flightNumber = action.payload;
		},
	},
});

export const {
	changeTravelType,
	changeTravelDepartureDate,
	submitTravelOriginLocation,
	submitTravelDestinationLocation,
	submitFlightNumber,
} = createTravelSlice.actions;

export const selectNewTravel = (state: RootState) => state.newTravel;

export default createTravelSlice.reducer;
