import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { NewAccommodationState } from './createAccommodationSlice';

const initialState: NewAccommodationState[] = [];

export const accommodationListSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		addAccommodation: (state, action: PayloadAction<any>) => {
			state.push(action.payload);
		},
	},
});

export const { addAccommodation } = accommodationListSlice.actions;
export const selectAccommodationList = (state: RootState) =>
	state.accommodationList;

export default accommodationListSlice.reducer;
