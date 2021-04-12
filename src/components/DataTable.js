import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { useDispatch, useSelector } from "react-redux";
import {
  getRowsSelector,
  getColumnsSelector,
  selectRows,
} from "../redux/ui/uiSlice";

import CustomToolbar from "./CustomToolbar";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    height: "50vh",
    width: "100%",
  },
  dataGridRoot: {
    padding: theme.dataGridPadding.padding,
    "& .MuiDataGrid-row.Mui-selected": {
      backgroundColor: "rgba(0, 102, 204, 0.08)",
    },
    "& .MuiCheckbox-colorPrimary.Mui-checked": {
      color: "#0066CC",
    },
  },

  dataGridRootVariable: {
    backgroundColor: "rgba(0, 102, 204, 0.08)",
  },

  gridHeader: {
    padding: theme.dataGridHeaders.padding,
  },
}));

export default function DataTable() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const columns = useSelector(getColumnsSelector);
  const rows = useSelector(getRowsSelector);

  const handleManySelectedRows = (params) => {
    dispatch(selectRows(params.selectionModel));
  };
  return (
    <Paper classes={{ root: styles.paperRoot }}>
      <DataGrid
        className={styles.dataGridRoot}
        onSelectionModelChange={handleManySelectedRows}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        density="compact"
        checkboxSelection={true}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableSelectionOnClick={true}
      />
    </Paper>
  );
}
