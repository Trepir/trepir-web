import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: string[] = [];

export const favoriteActivitySlice = createSlice({
	name: 'favoriteActivities',
	initialState,
	reducers: {
		toggleFavoriteActivity: (state, action: PayloadAction<string>) => {
			if (state.includes(action.payload)) {
				state.splice(state.indexOf(action.payload), 1);
			} else {
				state.push(action.payload);
			}
		},
	},
});

export const { toggleFavoriteActivity } = favoriteActivitySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectFavoriteActivities = (state: RootState) =>
	state.favoriteActivity;

export default favoriteActivitySlice.reducer;