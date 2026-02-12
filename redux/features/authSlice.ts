import { createSlice } from '@reduxjs/toolkit';
import type  {PayloadAction} from '@reduxjs/toolkit'

interface AuthState {
	isAuthenticated: boolean;
	accessToken: string | null;
	refreshToken: string | null;
	initialLoadFinished: boolean;
	isLoading: boolean;
  }
  
  const initialState: AuthState = {
	isAuthenticated: false,
	accessToken: null,
	refreshToken: null,
	initialLoadFinished: false,
	isLoading: false,
  };
  
  const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
	  setAuth: (state, action: PayloadAction<{ access: string; refresh: string }>) => {
		state.isAuthenticated = true;
		state.accessToken = action.payload.access;
		state.refreshToken = action.payload.refresh;
  
		localStorage.setItem('access', action.payload.access);
		localStorage.setItem('refresh', action.payload.refresh);
	  },
	  logout: (state) => {
		state.isAuthenticated = false;
		state.accessToken = null;
		state.refreshToken = null;
  
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
	  },
	  finishInitialLoad: (state) => {
		state.initialLoadFinished = true;
	  },
	},
  });
  
  export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
  export default authSlice.reducer;
  