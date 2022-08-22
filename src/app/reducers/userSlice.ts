import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: any = {};

export const userFavoriteActivitySlice = createSlice({
	name: 'userFavoriteActivities',
	initialState,
	reducers: {
		setUserFavoriteActivities: (state, action: PayloadAction<any>) => {
			state.activityList = action.payload;
		},
	},
});

export const { setUserFavoriteActivities } = userFavoriteActivitySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserFavoriteActivities = (state: RootState) =>
	state.userFavoriteActivities;

export default userFavoriteActivitySlice.reducer;
