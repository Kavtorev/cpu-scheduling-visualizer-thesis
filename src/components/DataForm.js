import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import { useDispatch, useSelector } from "react-redux";
import { toggleExtraForm, getExtraFormsAsArray } from "../redux/ui/uiSlice";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    marginBottom: "1em",
    padding: theme.dataGridPadding.padding,
  },

  gridRoot: {
    padding: theme.dataGridHeaders.padding,
  },

  innerGridRoot: {
    paddingTop: "4px",
  },

  header: {
    padding: theme.dataGridHeaders.padding,
  },
}));

function ExtraColumnButton({ id, text, children, ...rest }) {
  const dispatch = useDispatch();
  const handleExtraFormsToggle = (e) =>
    dispatch(toggleExtraForm(e.currentTarget.id));
  return (
    <Button id={id} {...rest} onClick={handleExtraFormsToggle}>
      {children}
    </Button>
  );
}

function ColumnForm({ endAdornment = null, ...rest }) {
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

function ExtraColumnForm({ buttonId, ...rest }) {
  const endAdornment = (
    <InputAdornment position="end">
      <ExtraColumnButton
        id={buttonId}
        label={rest.label}
        children={[<RemoveRoundedIcon />]}
      />
    </InputAdornment>
  );
  return <ColumnForm endAdornment={endAdornment} {...rest} />;
}

export default function DataForm() {
  const styles = useStyles();
  const extraForms = useSelector(getExtraFormsAsArray);

  return (
    <Paper classes={{ root: styles.paperRoot }}>
      <Typography variant="h6" classes={{ root: styles.header }}>
        Add a new record
      </Typography>
      <Grid container classes={{ root: styles.gridRoot }}>
        <Grid item xs={12} md={10}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            classes={{ root: styles.innerGridRoot }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <ColumnForm
                id="standard-required-arrivalTime"
                label="Arrival Time"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ColumnForm
                id="standard-required-cpuBirstTime"
                label="CPU Burst Time"
              />
            </Grid>
            {extraForms.map((el, i) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  {el[1].isShown ? (
                    <ExtraColumnForm
                      buttonId={el[0]}
                      id={el[1].formId}
                      label={el[1].label}
                    />
                  ) : (
                    <ExtraColumnButton
                      id={el[0]}
                      label={el[1].label}
                      children={[<AddRoundedIcon />, el[1].label]}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
