import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ExtraFormsList from "./ExtraFormsList";
import ColumnForm from "./ColumnForm";
import PaperHeader from "./PaperHeader";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { addNewRow } from "../redux/ui/uiSlice";
import { validate } from "../validation";
import { arrivalTimeSchema, cpuBurstSchema } from "../validation";

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
}));

export default function DataForm() {
  const styles = useStyles();
  const dispatch = useDispatch();

  return (
    <Paper classes={{ root: styles.paperRoot }}>
      <PaperHeader>Dodaj nowy record</PaperHeader>
      <Grid container classes={{ root: styles.gridRoot }}>
        <Grid item xs={12} lg={12}>
          <Formik
            initialValues={{
              arrivalTime: 0,
              cpuBurst: 0,
              priority: -1,
              inputOutput: -1,
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
                  <Grid item xs={12} sm={6} md={3}>
                    <Field
                      name="arrivalTime"
                      validate={validate(arrivalTimeSchema)}
                    >
                      {({ field, form: { touched, errors }, meta }) => (
                        <ColumnForm
                          id="standard-required-arrivalTime"
                          label="Arrival Time"
                          name="arrivalTime"
                          onChange={field.onChange}
                          value={field.value}
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error}
                          required
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Field name="cpuBurst" validate={validate(cpuBurstSchema)}>
                      {({ field, form: { touched, errors }, meta }) => (
                        <ColumnForm
                          id="standard-required-arrivalTime"
                          label="CPU burst"
                          name="cpuBurst"
                          onChange={field.onChange}
                          value={field.value}
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error}
                          required
                        />
                      )}
                    </Field>
                  </Grid>
                  <ExtraFormsList />
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
      </Grid>
    </Paper>
  );
}
