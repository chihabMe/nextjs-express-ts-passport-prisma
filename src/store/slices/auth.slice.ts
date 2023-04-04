import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}
const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
};
const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {},
});

export const authActions = authSlice.actions;
export const authReduces = authSlice.reducer;
