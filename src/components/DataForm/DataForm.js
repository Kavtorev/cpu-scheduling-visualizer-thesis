import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import InputsList from "./InputsList";
import PaperHeader from "../PaperHeader";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewRow,
  chooseAlgo,
  getChosenAlgorithm,
  getPreemptiveToggle,
  togglePreemptive,
} from "../../redux/ui/uiSlice";
import TextInput from "./TextInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { algorithms } from "./forms";

console.log(Object.entries(algorithms));

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: theme.dataGridPadding.padding,
  },

  gridRoot: {
    padding: theme.dataGridHeaders.padding,
  },

  innerGridRoot: {
    paddingTop: "4px",
  },
  algoSelectionRoot: {
    width: "70%",
  },
}));

export default function DataForm() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const algo = useSelector(getChosenAlgorithm);
  const toggle = useSelector(getPreemptiveToggle);

  const handleAlgoChange = ({ target }) =>
    dispatch(
      chooseAlgo({
        value: target.value,
        preemptive: algorithms[target.value].switchProps,
      })
    );
  const handleSwitchToggle = (event) => dispatch(togglePreemptive());
  return (
    <Paper classes={{ root: styles.paperRoot }}>
      <PaperHeader>Wybierz algorytm</PaperHeader>
      <Grid container classes={{ root: styles.gridRoot }}>
        <Grid item lg={4}>
          <TextInput
            helperText="Please select an algorithm"
            select
            value={algo}
            onChange={handleAlgoChange}
            classes={{ root: styles.algoSelectionRoot }}
          >
            {Object.entries(algorithms).map((option) => (
              <MenuItem key={option[1].label} value={option[0]}>
                {option[1].label}
              </MenuItem>
            ))}
          </TextInput>
        </Grid>
        {algo !== "_NONE" ? (
          <>
            <Grid item lg={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={toggle}
                    onChange={handleSwitchToggle}
                    name="checkedB"
                    color="primary"
                    {...algorithms[algo].switchProps}
                  />
                }
                label="W wyłaszczeniami"
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Formik
                initialValues={{
                  arrivalTime: 0,
                  cpuTime: 0,
                  priority: -1,
                }}
                onSubmit={(val) => dispatch(addNewRow(val))}
              >
                {(props) => (
                  <Form>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      classes={{ root: styles.innerGridRoot }}
                    >
                      <InputsList inputs={algorithms[algo].fields} />
                      <Box
                        component="div"
                        item
                        xs={12}
                        display="flex"
                        justifyContent="right"
                        style={{ width: "100%" }}
                      >
                        <IconButton aria-label="add a row" type="submit">
                          <AddRoundedIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Paper>
  );
}
