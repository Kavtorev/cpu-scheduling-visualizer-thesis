import React, { useState } from "react";
import { timeQuantumSchema, validate } from "../../validation";
import Grid from "@material-ui/core/Grid";
import TextInput from "./TextInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getTimeQuantum,
  setTimeQuantum,
  getTimeQuantumError,
  setTimeQuantumError,
} from "../../redux/ui/uiSlice";

export default function TimeQuantumForm() {
  const dispatch = useDispatch();
  const timeQuantumValue = useSelector(getTimeQuantum);
  const isError = useSelector(getTimeQuantumError);
  const [helperText, setHelperText] = useState("");

  const handleChange = (e) => {
    dispatch(setTimeQuantumError(false));
    setHelperText("");
    let errors = validate(timeQuantumSchema)(e.target.value);
    if (errors) {
      dispatch(setTimeQuantumError(true));
      setHelperText(errors);
    }
    dispatch(setTimeQuantum(e.target.value));
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <TextInput
        id="standard-required-timeQuantum"
        label="Time Quantum"
        name="timeQuantum"
        onChange={handleChange}
        value={timeQuantumValue}
        error={isError}
        helperText={helperText}
        required
        variant="outlined"
        type="number"
      />
    </Grid>
  );
}
