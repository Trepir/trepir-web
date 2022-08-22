import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createTripReducer from '../features/createTrip/createTripSlice';
import createAccommodationReducer from '../features/createAccommodation/createAccommodationSlice';
import accommodationListReducer from '../features/createAccommodation/accommodationList';
import createTravelReducer from '../features/createTravel/createTravelSlice';
import createActivityReducer from '../features/createActivity/createActivitySlice';
import favoriteActivityReducer from '../features/createActivity/favoriteActivitySlice';
import userFavoriteActivityReducer from './reducers/userSlice';
import travelListReducer from '../features/createTravel/travelListSlice';
import tripListReducer from '../features/createTrip/tripListSlice';
import selectedTripReducer from '../features/createTrip/selectedTripSlice';
import mapReducer from './reducers/mapSlice';
import discoverReducer from './reducers/discoverSlice';
import dashboardReducer from './reducers/dashboardSlice';

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
		favoriteActivity: favoriteActivityReducer,
		userFavoriteActivities: userFavoriteActivityReducer,
		selectedTrip: selectedTripReducer,
		newActivity: createActivityReducer,
		map: mapReducer,
		discover: discoverReducer,
		dashboard: dashboardReducer,
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
