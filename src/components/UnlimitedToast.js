import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useDispatch } from "react-redux";
import { setUnlimitedRows } from "../redux/ui/uiSlice";
import { toast } from "react-toastify";

export default function UnlimitedToast() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setUnlimitedRows(true));
    toast.dismiss();
  };
  return (
    <Box
      style={{
        textAlign: "center",
      }}
    >
      <Typography>⚙️More rows may impact the performance.</Typography>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleClick}
      >
        <Typography variant="button">I want more.</Typography>
      </Button>
    </Box>
  );
}
