import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import Button from "@material-ui/core/Button";
import { getIsExtraRequiredById, removeColumn } from "../redux/ui/uiSlice";
import ColumnForm from "./ColumnForm";
import { useDispatch, useSelector } from "react-redux";

export default function ExtraColumnForm({ buttonId, ...rest }) {
  const dispatch = useDispatch();
  const isRequired = useSelector(getIsExtraRequiredById);

  const handleRemoveColumn = (e) =>
    dispatch(
      removeColumn({
        id: e.currentTarget.id,
        label: e.currentTarget.getAttribute("label"),
      })
    );
  const endAdornment = !isRequired[buttonId] ? (
    <InputAdornment position="end">
      <Button id={buttonId} label={rest.label} onClick={handleRemoveColumn}>
        <RemoveRoundedIcon />
      </Button>
    </InputAdornment>
  ) : null;
  return <ColumnForm endAdornment={endAdornment} {...rest} />;
}
