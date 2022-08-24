import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface NewTripState {
	name: string;
	placeDetails: any;
	startDate: string;
	endDate: string;
	initialTripFavorites: any[];
}

const initialState: NewTripState = {
	name: 'idle',
	placeDetails: null,
	startDate: 'idle',
	endDate: 'idle',
	initialTripFavorites: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const createTripSlice = createSlice({
	name: 'newTrip',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		submitTripName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		// submitStepTwo: (state, action: PayloadAction<string>) => {
		// 	state.location = action.payload;
		// },
		submitTripLocation: (state, action: PayloadAction<any>) => {
			state.placeDetails = action.payload;
		},
		changeStartDate: (state, action: PayloadAction<any>) => {
			state.startDate = action.payload;
		},
		changeEndDate: (state, action: PayloadAction<any>) => {
			state.endDate = action.payload;
		},
		setInitialTripFavorites: (state, action: PayloadAction<any[]>) => {
			if (state.initialTripFavorites.includes(action.payload)) {
				state.initialTripFavorites.splice(
					state.initialTripFavorites.indexOf(action.payload),
					1
				);
			} else {
				state.initialTripFavorites = [
					...state.initialTripFavorites,
					action.payload,
				];
			}
		},
	},
});

export const {
	submitTripName,
	submitTripLocation,
	changeStartDate,
	changeEndDate,
	setInitialTripFavorites,
} = createTripSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewTrip = (state: RootState) => state.newTrip;

export default createTripSlice.reducer;
