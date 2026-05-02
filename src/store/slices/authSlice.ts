import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
interface AuthState { user: User | null; token: string | null; isAuthenticated: boolean; isLoading: boolean; error: string | null; }
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isAuthenticated: false, isLoading: false, error: null } as AuthState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user; state.token = action.payload.token; state.isAuthenticated = true; state.error = null;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) { if (state.user) Object.assign(state.user, action.payload); },
    setLoading(state, action: PayloadAction<boolean>) { state.isLoading = action.payload; },
    setError(state, action: PayloadAction<string>) { state.error = action.payload; state.isLoading = false; },
    logout(state) { state.user = null; state.token = null; state.isAuthenticated = false; state.error = null; },
  },
});
export const { setCredentials, updateUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
