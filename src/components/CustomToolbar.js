import React, { useRef } from "react";
import {
  GridToolbarContainer,
  GridFilterToolbarButton,
  GridDensitySelector,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  getNumberOfSelectedRows,
  deleteSelectedRows,
  resetRowSelection,
} from "../redux/ui/uiSlice";

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

function GridToolBarImport() {
  return (
    <>
      <Button aria-label="Upload data" size="small">
        <PublishOutlinedIcon />
        Import
      </Button>
    </>
  );
}

function GridToolBarDelete() {
  const dispatch = useDispatch();
  return (
    <>
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
    </>
  );
}

export default function CustomToolbar() {
  const styles = useStyles();
  const numSelected = useSelector(getNumberOfSelectedRows);

  return (
    <Grid container alignItems="center">
      <Grid item sm={12} lg={6}>
        <Typography variant="h6" classes={{ root: styles.gridHeader }}>
          Dane wejściowe
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <GridToolbarContainer className={styles.toolbarContainer}>
          <GridDensitySelector />
          <GridToolbarExport />
          <GridToolBarImport />
          <GridFilterToolbarButton />
          {numSelected > 0 ? <GridToolBarDelete /> : null}
        </GridToolbarContainer>
      </Grid>
    </Grid>
  );
}
