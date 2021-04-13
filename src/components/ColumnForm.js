import React from "react";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function ColumnForm({
  startAdornment = null,
  children = null,
  endAdornment = null,
  ...rest
}) {
  return (
    <TextField
      required
      defaultValue="0"
      InputProps={{
        startAdornment: startAdornment ? (
          startAdornment
        ) : (
          <InputAdornment position="start">s.</InputAdornment>
        ),
        endAdornment,
      }}
      {...rest}
    >
      {children}
    </TextField>
  );
}
