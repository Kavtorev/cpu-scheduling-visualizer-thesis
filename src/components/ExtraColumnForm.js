import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import ExtraColumnButton from "./ExtraColumnButton";
import ColumnForm from "./ColumnForm";

export default function ExtraColumnForm({ buttonId, ...rest }) {
  const endAdornment = (
    <InputAdornment position="end">
      <ExtraColumnButton id={buttonId} label={rest.label}>
        <RemoveRoundedIcon />
      </ExtraColumnButton>
    </InputAdornment>
  );
  return <ColumnForm endAdornment={endAdornment} {...rest} />;
}
