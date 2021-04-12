import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarToggled: false,
  extraForms: {
    priority: {
      id: "priority",
      formId: "standard-required-priority",
      label: "Priority",
      isShown: false,
    },
    inputOutput: {
      id: "inputOutput",
      formId: "standard-required-input-output-op",
      label: "I/O Time",
      isShown: false,
    },
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      console.log(action);
      state.isSidebarToggled = action.payload;
    },
    toggleExtraForm: (state, action) => {
      console.log(action.payload);
      state.extraForms[action.payload].isShown = !state.extraForms[
        action.payload
      ].isShown;
    },
  },
});

export const getIsSidebarToggled = (state) => state.ui.isSidebarToggled;
export const getExtraFormsAsArray = (state) =>
  Object.entries(state.ui.extraForms);
export default uiSlice.reducer;
export const { toggleSidebar, toggleExtraForm } = uiSlice.actions;
