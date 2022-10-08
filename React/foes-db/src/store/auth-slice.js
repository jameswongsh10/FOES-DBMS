import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isLoggedIn: false,
  tokenId: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.tokenId = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('token', state.tokenId);
    },
    logout(state) {
      state.tokenId = '';
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    }
  }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;