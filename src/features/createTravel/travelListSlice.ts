import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { NewTravelState } from './createTravelSlice';

const initialState: NewTravelState[] = [];

export const travelListSlice = createSlice({
	name: 'travelList',
	initialState,
	reducers: {
		addTravel: (state, action: PayloadAction<any>) => {
			state.push(action.payload);
		},
		resetTravelList: (state) => {
			state.length = 0;
		},
	},
});

export const { addTravel, resetTravelList } = travelListSlice.actions;
export const selectTravelList = (state: RootState) => state.travelList;

export default travelListSlice.reducer;
