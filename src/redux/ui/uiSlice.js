import { createSlice, createSelector } from "@reduxjs/toolkit";
import { prioritySchema, inputOutputSchema } from "../../validation";
import uniqid from "uniqid";

const initialState = {
  isSidebarToggled: false,
  extraForms: {
    priority: {
      id: "priority",
      formId: "standard-required-priority",
      label: "Priority",
      isShown: false,
      required: false,
    },
    inputOutput: {
      id: "inputOutput",
      formId: "standard-required-input-output-op",
      label: "I/O Time",
      isShown: false,
      required: false,
    },
  },
  dataGrid: {
    selectedRows: [],
    numberOfRows: 0,
    numberOfColumns: 0,
    columns: [
      {
        id: "ID",
        field: "id",
        headerName: "Process ID",
        flex: 0.1,
      },
      {
        id: "arrivalTime",
        field: "arrivalTime",
        headerName: "Arrival Time",
        flex: 0.1,
      },
      {
        id: "cpuBurst",
        field: "cpuBurst",
        headerName: "CPU burst",
        flex: 0.1,
      },
    ],
    // row name is mapped to a field property of a column
    rows: [],
  },
  visualizationsList: [
    { id: 23473, name: "Wizualizacja 2" },
    { id: 3364, name: "Wizualizacja 3" },
    { id: 4737, name: "Wizualizacja 4" },
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
    addNewColumn: (state, action) => {
      const { id, label } = action.payload;
      state.extraForms[id].isShown = true;
      state.dataGrid.columns.push({
        id: id,
        field: id,
        headerName: label,
        flex: 0.1,
      });
    },
    removeColumn: (state, action) => {
      const { id } = action.payload;
      state.extraForms[id].isShown = false;

      for (let i = 0; i < state.dataGrid.columns.length; i++) {
        if (state.dataGrid.columns[i].id === id) {
          state.dataGrid.columns.splice(i);
        }
      }
    },
    addNewRow: (state, action) => {
      const { arrivalTime, cpuBurst, inputOutput, priority } = action.payload;
      const extra = {};
      if (priority > -1) {
        state.extraForms.priority.required = true;
        extra.priority = priority;
      }
      if (inputOutput > -1) {
        state.extraForms.inputOutput.required = true;
        extra.inputOutput = inputOutput;
      }

      state.dataGrid.rows.push({
        id: uniqid.process(),
        arrivalTime,
        cpuBurst,
        ...extra,
      });
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

      if (!state.dataGrid.rows.length) {
        for (let key in state.extraForms) {
          state.extraForms[key].required = false;
        }
      }
    },
  },
});

export const getIsExtraRequiredById = (state) => {
  const obj = {};
  for (let key in state.ui.extraForms)
    obj[key] = state.ui.extraForms[key].required;
  return obj;
};

export const getExtraFormsAsArray = createSelector(
  (state) => Object.entries(state.ui.extraForms),
  (forms) => forms
);

export const getRowsSelector = createSelector(
  (state) => state.ui.dataGrid.rows,
  (rows) => rows
);
export const getColumnsSelector = createSelector(
  (state) => state.ui.dataGrid.columns,
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
  setColumns,
  setRows,
  selectRows,
  deleteSelectedRows,
  resetRowSelection,
  addNewColumn,
  removeColumn,
  addNewRow,
} = uiSlice.actions;
