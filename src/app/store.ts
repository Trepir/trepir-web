import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createTripReducer from '../features/createTrip/createTripSlice';
import createAccommodationReducer from '../features/createAccommodation/createAccommodationSlice';
import accommodationListReducer from '../features/createAccommodation/accommodationList';
import createTravelReducer from '../features/createTravel/createTravelSlice';
import createActivityReducer from '../features/createActivity/createActivitySlice';
import travelListReducer from '../features/createTravel/travelListSlice';
import tripListReducer from '../features/createTrip/tripListSlice';
import selectedTripReducer from '../features/createTrip/selectedTripSlice';
import mapReducer from './reducers/mapSlice';
import authReducer from './reducers/authSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		newTrip: createTripReducer,
		newAccommodation: createAccommodationReducer,
		accommodationList: accommodationListReducer,
		newTravel: createTravelReducer,
		travelList: travelListReducer,
		tripList: tripListReducer,
		selectedTrip: selectedTripReducer,
		newActivity: createActivityReducer,
		map: mapReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
