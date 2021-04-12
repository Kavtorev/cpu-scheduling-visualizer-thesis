import { createSlice, createSelector } from "@reduxjs/toolkit";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

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
  dataGrid: {
    selectedRows: [],
    numberOfRows: 0,
    numberOfColumns: 0,
    columns: [
      {
        id: Math.random(),
        field: "col1",
        headerName: "Column 1",
        flex: 0.3,
      },
      {
        id: Math.random(),
        field: "col2",
        headerName: "Column 2",
        flex: 0.3,
      },
    ],
    rows: [
      { id: 1, col1: "1", col2: "World" },
      { id: 2, col1: "2", col2: "is Awesome" },
      { id: 3, col1: "3", col2: "is Amazing" },
      { id: 4, col1: "1", col2: "World" },
      { id: 5, col1: "2", col2: "is Awesome" },
      { id: 6, col1: "3", col2: "is Amazing" },
      { id: 7, col1: "1", col2: "World" },
      { id: 8, col1: "2", col2: "is Awesome" },
      { id: 9, col1: "3", col2: "is Amazing" },
      { id: 10, col1: "1", col2: "World" },
      { id: 11, col1: "2", col2: "is Awesome" },
      { id: 12, col1: "3", col2: "is Amazing" },
    ],
  },
  visualizationsList: [
    {
      id: 1626,
      name: "Wizualizacja 1",
    },
    { id: 23473, name: "Wizualizacja 2" },
    { id: 3364, name: "Wizualizacja 3" },
    { id: 4737, name: "Wizualizacja 4" },
    { id: 2344473, name: "Wizualizacja 2" },
    { id: 337364, name: "Wizualizacja 3" },
    { id: 473837, name: "Wizualizacja 4" },
    { id: 238344473, name: "Wizualizacja 2" },
  ],
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
    addNewColumn: (state, action) => {
      state.dataGrid.columns.push(action.payload);
    },
    addNewRow: (state, action) => {
      state.dataGrid.rows.push(action.payload);
    },
    setColumns: (state, action) => {
      state.dataGrid.columns = action.payload;
    },
    setRows: (state, action) => {
      state.dataGrid.rows = action.payload;
    },
    selectRows: (state, action) => {
      state.dataGrid.selectedRows = action.payload;
    },
    resetRowSelection: (state, action) => {
      state.dataGrid.selectedRows = [];
    },
    deleteSelectedRows: (state, action) => {
      if (state.dataGrid.selectedRows.length) {
        state.dataGrid.rows = state.dataGrid.rows.filter((e) => {
          return !state.dataGrid.selectedRows.includes(String(e.id));
        });
      }
    },
  },
});

export const getExtraFormsAsArray = createSelector(
  (state) => Object.entries(state.ui.extraForms),
  (forms) => forms
);

export const getRowsSelector = createSelector(
  (state) => state.ui.dataGrid.columns,
  (rows) => rows
);
export const getColumnsSelector = createSelector(
  (state) => state.ui.dataGrid.rows,
  (columns) => columns
);

export const getNumberOfSelectedRows = createSelector(
  (state) => state.ui.dataGrid.selectedRows.length,
  (num) => num
);

export const getVisualizations = createSelector(
  (state) => state.ui.visualizationsList,
  (vis) => vis
);

export const getIsSidebarToggled = (state) => state.ui.isSidebarToggled;
export const getNumberOfRows = (state) => state.ui.dataGrid.numberOfRows;
export const getNumberOfColumns = (state) => state.ui.dataGrid.numberOfColumns;

export default uiSlice.reducer;
export const {
  toggleSidebar,
  toggleExtraForm,
  setColumns,
  setRows,
  selectRows,
  deleteSelectedRows,
  resetRowSelection,
} = uiSlice.actions;
