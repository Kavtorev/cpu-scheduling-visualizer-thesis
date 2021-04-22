import { createSlice, createSelector } from "@reduxjs/toolkit";
import uniqid from "uniqid";

const initialState = {
  isSidebarToggled: false,
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
        id: "cpuTime",
        field: "cpuTime",
        headerName: "CPU Time",
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
  chosenAlgorithm: {
    name: "_NONE",
    timeQuantum: 2,
    isError: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setTimeQuantumError: (state, action) => {
      state.chosenAlgorithm.isError = action.payload;
    },
    setTimeQuantum: (state) => {
      state.chosenAlgorithm.timeQuantum = state.payload;
    },

    chooseAlgo: (state, action) => {
      let { value } = action.payload;
      console.log(value);
      if (value.startsWith("_PRIOR")) {
        if (!state.chosenAlgorithm.name.startsWith("_PRIOR")) {
          state.dataGrid.columns.push({
            id: "priority",
            field: "priority",
            headerName: "Priority",
            flex: 0.1,
          });
          state.dataGrid.rows = [];
        }
      } else {
        state.dataGrid.rows = [];
        state.dataGrid.columns = initialState.dataGrid.columns;
      }
      state.chosenAlgorithm.name = value;
    },
    toggleSidebar: (state, action) => {
      state.isSidebarToggled = action.payload;
    },
    addNewRow: (state, action) => {
      const { arrivalTime, cpuTime, priority } = action.payload;

      state.dataGrid.rows.push({
        id: uniqid.process(),
        name: `Process №${state.dataGrid.rows.length + 1}`,
        waitingTime: 0,
        turnaroundTime: 0,
        responseTime: 0,
        cpuTimeLeft: cpuTime,
        arrivalTime,
        cpuTime,
        priority,
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

export const getTimeQuantum = (state) => state.ui.chosenAlgorithm.timeQuantum;
export const getTimeQuantumError = (state) => state.ui.chosenAlgorithm.isError;
export const getIsSidebarToggled = (state) => state.ui.isSidebarToggled;
export const getChosenAlgorithmName = (state) => state.ui.chosenAlgorithm.name;
export const getChosenAlgorithm = (state) => state.ui.chosenAlgorithm;
export const getPreemptiveToggle = (state) =>
  state.ui.chosenAlgorithm.preemptive;
export const getIsReadyToStart = (state) =>
  state.ui.chosenAlgorithm.name !== "_NONE" && state.ui.dataGrid.rows.length;
export const getRows = (state) => state.ui.dataGrid.rows;

export default uiSlice.reducer;
export const {
  toggleSidebar,
  setColumns,
  setRows,
  selectRows,
  deleteSelectedRows,
  resetRowSelection,
  addNewRow,
  chooseAlgo,
  togglePreemptive,
  setTimeQuantum,
  setTimeQuantumError,
} = uiSlice.actions;
