import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getRandomInt } from "../../lib/utils";
import uniqid from "uniqid";
import { toast } from "react-toastify";
import UnlimitedToast from "../../components/UnlimitedToast";

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
    unlimitedRows: false,
  },
  visualizationsList: [
    { id: 23473, name: "Wizualizacja 2" },
    { id: 3364, name: "Wizualizacja 3" },
    { id: 4737, name: "Wizualizacja 4" },
  ],
  chosenAlgorithm: {
    name: "_NONE",
    timeQuantum: 2,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    generateData: (state, action) => {
      let { rowsNumber } = action.payload;
      let cpuTime, arrivalTime, priority;
      let rows = [];

      for (let index = 0; index < rowsNumber; index++) {
        cpuTime = getRandomInt(1, 8);
        arrivalTime = getRandomInt(0, rowsNumber);
        priority = getRandomInt(1, rowsNumber);

        rows.push({
          id: uniqid.process(),
          name: `Process №${index + 1}`,
          waitingTime: 0,
          turnaroundTime: 0,
          responseTime: 0,
          cpuTimeLeft: cpuTime,
          arrivalTime,
          cpuTime,
          priority,
        });
      }

      state.dataGrid.rows = rows;
    },
    setUnlimitedRows: (state, action) => {
      state.dataGrid.unlimitedRows = action.payload;
    },
    setTimeQuantum: (state, action) => {
      state.chosenAlgorithm.timeQuantum = action.payload;
    },
    chooseAlgo: (state, action) => {
      let { value } = action.payload;
      if (value.startsWith("_PRIOR")) {
        if (!state.chosenAlgorithm.name.startsWith("_PRIOR")) {
          state.dataGrid.columns.push({
            id: "priority",
            field: "priority",
            headerName: "Priority",
            flex: 0.1,
          });

          // mb generate random priorities in the future...
          state.dataGrid.rows = [];
        }
      } else {
        state.dataGrid.columns = initialState.dataGrid.columns;
      }
      state.chosenAlgorithm.name = value;
    },
    toggleSidebar: (state, action) => {
      state.isSidebarToggled = action.payload;
    },
    addNewRow: (state, action) => {
      const { arrivalTime, cpuTime, priority } = action.payload;
      if (state.dataGrid.rows.length < 20 || state.dataGrid.unlimitedRows) {
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
      } else {
        toast(<UnlimitedToast />, {
          autoClose: 10000,
          type: toast.TYPE.INFO,
        });
      }
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
  generateData,
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
  setUnlimitedRows,
} = uiSlice.actions;
