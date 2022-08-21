import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface discoverState {
	activities: any[] | null;
	tagsApplied: any[];
	filteredActivities: any[] | null | undefined;
}

const initialState: discoverState = {
	activities: null,
	tagsApplied: [],
	filteredActivities: null,
};

export const discoverSlice = createSlice({
	name: 'discover',
	initialState,
	reducers: {
		setTagsApplied: (state, action: PayloadAction<any>) => {
			//	first check if the tag is already in the array
			const index = state.tagsApplied.indexOf(action.payload);
			if (index === -1) {
				//	if it does not exist, then add it
				state.tagsApplied = [...state.tagsApplied, action.payload];
			} else {
				//	if it does exist, then remove it (without mutating the state)
				state.tagsApplied = [
					...state.tagsApplied.slice(0, index),
					...state.tagsApplied.slice(index + 1),
				];
			}
		},
		setActivities: (state, action) => {
			state.activities = action.payload;
		},
		setFilteredActivities: (state) => {
			state.filteredActivities = state.activities?.filter((activity) => {
				let result: boolean = true;
				state.tagsApplied.forEach((tag) => {
					if (activity.tags.includes(tag)) return;
					result = false;
				});
				return result;
			});
		},
		resetDiscover: (state) => {
			state.activities = null;
			state.tagsApplied = [];
			state.filteredActivities = null;
		},
	},
});

export const {
	setTagsApplied,
	setActivities,
	setFilteredActivities,
	resetDiscover,
} = discoverSlice.actions;

export const selectActivities = (state: RootState) => state.discover.activities;
export const selectTagsApplied = (state: RootState) =>
	state.discover.tagsApplied;
export const selectFilteredActivities = (state: RootState) =>
	state.discover.filteredActivities;

export default discoverSlice.reducer;
