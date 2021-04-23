import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Popper from "@material-ui/core/Popper";
import TextInput from "./TextInput";
import { generateData } from "../../redux/ui/uiSlice";
import { useDispatch } from "react-redux";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { generateSchema } from "../../validation";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles({
  paperRoot: {
    padding: "1em",
  },
});

export default function GenerateButton() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const formik = useFormik({
    initialValues: {
      rowsNumber: "",
    },
    validationSchema: generateSchema,
    onSubmit: (val) => console.log(val),
  });

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleGenerate = () => {
    dispatch(generateData());
  };
  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;
  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        size="small"
        disableElevation
        onClick={handleClick}
      >
        <Typography variant="button">Generate r. data</Typography>
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        placement="right-start"
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClick}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper classes={{ root: styles.paperRoot }}>
                <form onSubmit={formik.handleSubmit}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
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
                        formik.touched.rowsNumber &&
                        Boolean(formik.errors.rowsNumber)
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
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
