import React from "react";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function ColumnForm({ endAdornment = null, ...rest }) {
  return (
    <TextField
      required
      defaultValue="0"
      InputProps={{
        startAdornment: <InputAdornment position="start">s.</InputAdornment>,
        endAdornment,
      }}
      {...rest}
    />
  );
}
