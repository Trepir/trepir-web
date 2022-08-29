import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface dashboardState {
	viewingMap: boolean;
}

const initialState: dashboardState = {
	viewingMap: false,
};

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		setViewingMap: (state, action: PayloadAction<boolean>) => {
			state.viewingMap = action.payload;
		},
	},
});

export const { setViewingMap } = dashboardSlice.actions;

export const selectViewingMap = (state: RootState) =>
	state.dashboard.viewingMap;

export default dashboardSlice.reducer;
