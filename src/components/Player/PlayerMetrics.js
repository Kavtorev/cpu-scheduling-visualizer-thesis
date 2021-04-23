import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ColumnForm from "../DataForm/TextInput";
import {
  AverageResponseTime,
  AverageWaitingIcon,
  AverageTurnaroundIcon,
} from "./PlayerMetricsIcons";
import { useSelector } from "react-redux";
import { getMetrics } from "../../redux/player/playerSlice";

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

export default function PlayerMetrics() {
  const styles = useStyles();
  const metrics = useSelector(getMetrics);

  const metricsMeta = [
    {
      label: "Average Turnaround Time",
      icon: <AverageTurnaroundIcon />,
      value: metrics[0],
    },
    {
      label: "Average Waiting Time",
      icon: <AverageWaitingIcon />,
      value: metrics[1],
    },
    {
      label: "Average Response Time",
      icon: <AverageResponseTime />,
      value: metrics[2],
    },
  ];

  return (
    <Grid container spacing={2}>
      {metricsMeta.map((e, i) => {
        return (
          <Grid item key={e.label}>
            <ColumnForm
              label={e.label}
              startAdornment={e.icon}
              classes={{ root: styles.metricFormRoot }}
              value={`${e.value.toFixed(2)} s.`}
              disabled
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
