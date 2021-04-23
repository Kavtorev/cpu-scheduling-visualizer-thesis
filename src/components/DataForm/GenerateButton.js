import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import TextInput from "./TextInput";
import { generateData } from "../../redux/ui/uiSlice";
import { useDispatch } from "react-redux";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { generateSchema } from "../../validation";

const useStyles = makeStyles({
  paperRoot: {
    padding: "1em",
  },
});

export default function GenerateButton() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      rowsNumber: "",
    },
    validationSchema: generateSchema,
    onSubmit: (val) => {
      dispatch(generateData(val));
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <Typography variant="button">Generare R. Data</Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper classes={{ root: styles.paperRoot }}>
          <form onSubmit={formik.handleSubmit}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <TextInput
                id="standard-required-rowsNumber"
                label="Rows number"
                name="rowsNumber"
                required
                variant="outlined"
                type="number"
                value={formik.values.rowsNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.rowsNumber && Boolean(formik.errors.rowsNumber)
                }
                helperText={
                  formik.touched.rowsNumber && formik.errors.rowsNumber
                }
              />
              <Box mt={1} />
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
              >
                <Typography variant="button">Generate</Typography>
              </Button>
            </Box>
          </form>
        </Paper>
      </Popover>
    </div>
  );
}
