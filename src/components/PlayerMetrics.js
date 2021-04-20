import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ColumnForm from "./DataForm/TextInput";

import {
  AverageResponseTime,
  AverageWaitingIcon,
  AverageTurnaroundIcon,
} from "./PlayerMetricsIcons";

const useStyles = makeStyles((theme) => ({
  metricFormRoot: {
    "& .MuiInputBase-input": {
      marginLeft: "1em",
    },
    "& .Mui-disabled": {
      color: "#777777",
    },
  },
}));

const metricsMeta = [
  { label: "Average Turnaround Time", icon: <AverageTurnaroundIcon /> },
  { label: "Average Waiting Time", icon: <AverageWaitingIcon /> },
  { label: "Average Response Time", icon: <AverageResponseTime /> },
];

export default function PlayerMetrics() {
  const styles = useStyles();
  return (
    <Grid container spacing={2}>
      {metricsMeta.map((e) => {
        return (
          <Grid item key={e.label}>
            <ColumnForm
              label={e.label}
              startAdornment={e.icon}
              classes={{ root: styles.metricFormRoot }}
              defaultValue="0 s."
              disabled
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
