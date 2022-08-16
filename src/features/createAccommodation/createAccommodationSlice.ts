import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface NewAccommodationState {
	location: any;
	startDate: string;
	endDate: string;
}

const initialState: NewAccommodationState = {
	location: null,
	startDate: 'idle',
	endDate: 'idle',
};

// export const TripAccommodationState: NewAccommodationState[] = [initialState];

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const createAccommodationSlice = createSlice({
	name: 'counter',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		// submitStepTwo: (state, action: PayloadAction<string>) => {
		// 	state.location = action.payload;
		// },
		submitAccommodationLocation: (state, action: PayloadAction<any>) => {
			state.location = action.payload;
		},
		changeAccommodationStartDate: (state, action: PayloadAction<any>) => {
			state.startDate = action.payload;
		},
		changeAccommodationEndDate: (state, action: PayloadAction<any>) => {
			state.endDate = action.payload;
		},
	},
});

export const {
	submitAccommodationLocation,
	changeAccommodationStartDate,
	changeAccommodationEndDate,
} = createAccommodationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewAccommodation = (state: RootState) =>
	state.newAccommodation;

export default createAccommodationSlice.reducer;
