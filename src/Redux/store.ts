import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createTripReducer from './reducers/createTrip/createTripSlice';
import createAccommodationReducer from './reducers/createAccommodation/createAccommodationSlice';
import accommodationListReducer from './reducers/createAccommodation/accommodationListSlice';
import createTravelReducer from './reducers/createTravel/createTravelSlice';
import createActivityReducer from './reducers/createActivity/createActivitySlice';
import favoriteActivityReducer from './reducers/createActivity/favoriteActivitySlice';
import userFavoriteActivityReducer from './reducers/userSlice';
import travelListReducer from './reducers/createTravel/travelListSlice';
import tripListReducer from './reducers/createTrip/tripListSlice';
import selectedTripReducer from './reducers/createTrip/selectedTripSlice';
import mapReducer from './reducers/mapSlice';
import discoverReducer from './reducers/discoverSlice';
import dashboardReducer from './reducers/dashboardSlice';

import authReducer from './reducers/authSlice';

export const store = configureStore({
	reducer: {
		newTrip: createTripReducer,
		newAccommodation: createAccommodationReducer,
		accommodationList: accommodationListReducer,
		newTravel: createTravelReducer,
		travelList: travelListReducer,
		tripList: tripListReducer,
		favoriteActivities: favoriteActivityReducer,
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
