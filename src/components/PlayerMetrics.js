import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ColumnForm from "./ColumnForm";

const useStyles = makeStyles((theme) => ({}));

const metricsLabels = [
  "Average Turnaround Time",
  "Average Waiting Time",
  "Average Response Time",
];

export default function PlayerMetrics() {
  const styles = useStyles();
  return (
    <Grid container spacing={2}>
      {metricsLabels.map((e) => {
        return (
          <Grid item>
            <ColumnForm label={e} />
          </Grid>
        );
      })}
    </Grid>
  );
}
