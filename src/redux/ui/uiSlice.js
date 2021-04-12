import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarToggled: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      console.log(action);
      state.isSidebarToggled = action.payload;
    },
  },
});

export const getIsSidebarToggled = (state) => state.ui.isSidebarToggled;

export default uiSlice.reducer;
export const { toggleSidebar } = uiSlice.actions;
