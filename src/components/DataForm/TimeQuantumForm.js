import React from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import Slider from "@material-ui/core/Slider";
import { Typography } from "@material-ui/core";
import { setTimeQuantum } from "../../redux/ui/uiSlice";

export default function TimeQuantumForm() {
  const dispatch = useDispatch();

  const marks = [...Array(10)].map((_, i) => ({ value: i + 1, label: i + 1 }));

  const handleCommittedChange = (_, value) => dispatch(setTimeQuantum(value));

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Typography id="timeQuantum-slider" gutterBottom>
        Set Time Quantum
      </Typography>
      <Slider
        aria-labelledby="timeQuantum-slider"
        defaultValue={2}
        step={1}
        min={1}
        max={10}
        marks={marks}
        onChangeCommitted={handleCommittedChange}
      />
    </Grid>
  );
}
