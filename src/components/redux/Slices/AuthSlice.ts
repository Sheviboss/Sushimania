import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  auth: boolean;
  login: string;
  password: string;
  name: string;
}
const initialState: AuthState = {
  auth: false,
  login: '',
  password: '',
  name: '',
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setLog: (state, action) => {
      state.login = action.payload;
    },
    setPass: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setAuth, setLog, setPass, setName } = AuthSlice.actions;

export default AuthSlice.reducer;
