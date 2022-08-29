import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface NewActivityState {
	name: string;
	description: string;
	location: any;
	duration: { hours: number; minutes: number };
	tag: readonly string[];
	timeStart: number;
	timeEnd: number;
}

const initialState: NewActivityState = {
	name: 'idle',
	description: 'idle',
	location: null,
	duration: { hours: 0, minutes: 0 },
	tag: [],
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
		submitActivityDurationHours: (state, action: PayloadAction<number>) => {
			state.duration.hours = action.payload;
		},
		submitActivityDurationMinutes: (state, action: PayloadAction<number>) => {
			state.duration.minutes = action.payload;
		},
		submitActivityTag: (state, action: PayloadAction<string[]>) => {
			state.tag = action.payload;
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
	submitActivityDurationHours,
	submitActivityDurationMinutes,
	submitActivityLocation,
	submitActivityTag,
	submitActivityTimeStart,
	submitActivityTimeEnd,
} = createActivitySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewActivity = (state: RootState) => state.newActivity;

export default createActivitySlice.reducer;
