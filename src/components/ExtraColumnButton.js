import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { toggleExtraForm } from "../redux/ui/uiSlice";

export default function ExtraColumnButton({ id, text, children, ...rest }) {
  const dispatch = useDispatch();
  const handleExtraFormsToggle = (e) => {
    dispatch(toggleExtraForm(e.currentTarget.id));
  };
  return (
    <Button id={id} {...rest} onClick={handleExtraFormsToggle}>
      {children}
    </Button>
  );
}
