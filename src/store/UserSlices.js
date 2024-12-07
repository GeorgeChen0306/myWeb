import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "public",
  username: null,
  firstName: null,
  lastName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateRole: (state, action) => {
      state.role = action.payload;
    },
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updateFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    updateLastName: (state, action) => {
      state.lastName = action.payload;
    },
    logoutUser: () => initialState, // Reset state to initial values
  },
});

export const {
  updateRole,
  updateUsername,
  updateFirstName,
  updateLastName,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;