import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface authState {
	uid: string | null;
	displayName: string | null;
}

const initialState: authState = {
	uid: null,
	displayName: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUid: (state, action: PayloadAction<string | null>) => {
			state.uid = action.payload;
		},
		setDisplayName: (state, action: PayloadAction<string | null>) => {
			state.displayName = action.payload;
		},
	},
});

export const { setUid, setDisplayName } = authSlice.actions;

export const selectUid = (state: RootState) => state.auth.uid;
export const selectDisplayName = (state: RootState) => state.auth.displayName;

export default authSlice.reducer;
