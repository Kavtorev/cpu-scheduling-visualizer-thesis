import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ExtraFormsList from "./ExtraFormsList";
import ColumnForm from "./ColumnForm";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    marginBottom: "1em",
    padding: theme.dataGridPadding.padding,
  },

  gridRoot: {
    padding: theme.dataGridHeaders.padding,
  },

  innerGridRoot: {
    paddingTop: "4px",
  },

  header: {
    padding: theme.dataGridHeaders.padding,
  },
}));

export default function DataForm() {
  const styles = useStyles();

  return (
    <Paper classes={{ root: styles.paperRoot }}>
      <Typography variant="h6" classes={{ root: styles.header }}>
        Add a new record
      </Typography>
      <Grid container classes={{ root: styles.gridRoot }}>
        <Grid item xs={12} lg={10}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            classes={{ root: styles.innerGridRoot }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <ColumnForm
                id="standard-required-arrivalTime"
                label="Arrival Time"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ColumnForm
                id="standard-required-cpuBirstTime"
                label="CPU Burst Time"
              />
            </Grid>
            <ExtraFormsList />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
