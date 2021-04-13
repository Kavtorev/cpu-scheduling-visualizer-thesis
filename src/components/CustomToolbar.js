import React, { useRef, memo } from "react";
import { GridToolbarContainer } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  getNumberOfSelectedRows,
  deleteSelectedRows,
  resetRowSelection,
} from "../redux/ui/uiSlice";
import PaperHeader from "./PaperHeader";
import GridToolbarPredefinedOptions from "./GridToolbarPredefinedOptions";

const useStyles = makeStyles((theme) => ({
  gridHeader: {
    padding: theme.dataGridHeaders.padding,
  },
  toolbarContainer: {
    "& .MuiButtonBase-root": {
      color: "#0066CC",
      margin: "0.7em",
    },

    "& .MuiSvgIcon-root": {
      color: "#696565",
      fontSize: "1.5  rem",
    },
  },
}));

function GridToolBarDelete() {
  const dispatch = useDispatch();
  const numSelected = useSelector(getNumberOfSelectedRows);

  return (
    <>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <Button
            aria-label="Delete rows"
            size="small"
            onClick={() => {
              dispatch(deleteSelectedRows());
              dispatch(resetRowSelection());
            }}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      ) : null}
    </>
  );
}

export default memo(function CustomToolbar() {
  const styles = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item sm={12} lg={6}>
        <PaperHeader>Dane wejściowe</PaperHeader>
      </Grid>
      <Grid item xs={12} lg={6}>
        <GridToolbarContainer className={styles.toolbarContainer}>
          <GridToolbarPredefinedOptions />
          <GridToolBarDelete />
        </GridToolbarContainer>
      </Grid>
    </Grid>
  );
});
