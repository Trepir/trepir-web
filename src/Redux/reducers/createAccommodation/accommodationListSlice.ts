import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { NewAccommodationState } from './createAccommodationSlice';

const initialState: NewAccommodationState[] = [];

export const accommodationListSlice = createSlice({
	name: 'accommodationList',
	initialState,
	reducers: {
		addAccommodation: (state, action: PayloadAction<any>) => {
			state.push(action.payload);
		},
		resetAccommodationList: (state) => {
			state.length = 0;
		},
	},
});

export const { addAccommodation, resetAccommodationList } =
	accommodationListSlice.actions;
export const selectAccommodationList = (state: RootState) =>
	state.accommodationList;

export default accommodationListSlice.reducer;
