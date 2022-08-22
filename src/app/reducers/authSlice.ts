import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface authState {
	uid: string | null;
}

const initialState: authState = {
	uid: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUid: (state, action: PayloadAction<string | null>) => {
			state.uid = action.payload;
		},
	},
});

export const { setUid } = authSlice.actions;

export const selectUid = (state: RootState) => state.auth.uid;

export default authSlice.reducer;
