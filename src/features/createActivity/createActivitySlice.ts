import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface NewActivityState {
	name: string;
	description: string;
	location: any;
	duration: number;
	tags: string[];
	timeStart: number;
	timeEnd: number;
}

const initialState: NewActivityState = {
	name: 'idle',
	description: 'idle',
	location: null,
	duration: 0,
	tags: [],
	timeStart: 0,
	timeEnd: 0,
};

export const createActivitySlice = createSlice({
	name: 'newActivity',
	initialState,
	reducers: {
		submitActivityName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		submitActivityLocation: (state, action: PayloadAction<any>) => {
			state.location = action.payload;
		},
		submitActivityDescription: (state, action: PayloadAction<string>) => {
			state.description = action.payload;
		},
		submitActivityDuration: (state, action: PayloadAction<number>) => {
			state.duration = action.payload;
		},
		toggleActivityTags: (state, action: PayloadAction<string>) => {
			if (state.tags.indexOf(action.payload) !== -1) {
				state.tags.splice(state.tags.indexOf(action.payload), 1);
			} else {
				state.tags.push(action.payload);
			}
		},
		submitActivityTimeStart: (state, action: PayloadAction<number>) => {
			state.timeStart = action.payload;
		},
		submitActivityTimeEnd: (state, action: PayloadAction<number>) => {
			state.timeEnd = action.payload;
		},
	},
});

export const {
	submitActivityName,
	submitActivityDescription,
	submitActivityDuration,
	submitActivityLocation,
	toggleActivityTags,
	submitActivityTimeStart,
	submitActivityTimeEnd,
} = createActivitySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewActivity = (state: RootState) => state.newActivity;

export default createActivitySlice.reducer;
