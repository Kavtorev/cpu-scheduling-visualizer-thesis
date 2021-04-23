import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputsList from "./InputsList";
import PaperHeader from "../PaperHeader";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewRow,
  chooseAlgo,
  getChosenAlgorithmName,
} from "../../redux/ui/uiSlice";
import { resetAction } from "../../redux/player/playerSlice";
import TextInput from "./TextInput";
import MenuItem from "@material-ui/core/MenuItem";
import { algorithms } from "./forms";
import TimeQuantumForm from "./TimeQuantumForm";
import Typography from "@material-ui/core/Typography";
import GenerateButton from "./GenerateButton";

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
    width: "90%",
  },
}));

export default function DataForm() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const algo = useSelector(getChosenAlgorithmName);

  const handleAlgoChange = ({ target }) => {
    dispatch(
      chooseAlgo({
        value: target.value,
      })
    );
  };

  return (
    <Paper classes={{ root: styles.paperRoot }}>
      <PaperHeader>Wybierz algorytm</PaperHeader>
      <Box mt={1} />
      <Grid container classes={{ root: styles.gridRoot }}>
        <Grid item xs={12} md={6}>
          <TextInput
            helperText="Please select an algorithm"
            select
            value={algo !== "_NONE" ? algo : ""}
            onChange={handleAlgoChange}
            classes={{ root: styles.algoSelectionRoot }}
          >
            {Object.entries(algorithms).map((option) => (
              <MenuItem key={option[0]} value={option[0]}>
                {option[1].label}
              </MenuItem>
            ))}
          </TextInput>
        </Grid>

        {algo !== "_NONE" ? (
          <>
            <Grid item xs={12} md={4}>
              <GenerateButton />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box mt={1} />
              <Formik
                initialValues={{
                  arrivalTime: 0,
                  cpuTime: 0,
                  priority: -1,
                  timeQuantum: -1,
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
                      {algo === "_RR" ? <TimeQuantumForm /> : null}
                      <Box
                        component="div"
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        style={{ width: "100%" }}
                      >
                        <Button
                          aria-label="add a row"
                          type="submit"
                          variant="contained"
                          color="primary"
                          disableElevation
                          size="small"
                        >
                          <Typography variant="button">Add</Typography>
                          <AddRoundedIcon fontSize="small" />
                        </Button>
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
