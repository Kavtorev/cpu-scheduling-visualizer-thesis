import React from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { addNewColumn } from "../redux/ui/uiSlice";
import ExtraColumnForm from "./ExtraColumnForm";
import { Field } from "formik";
import { validate } from "../validation";
import { prioritySchema, inputOutputSchema } from "./../validation";

const mappedSchemas = {
  priority: prioritySchema,
  inputOutput: inputOutputSchema,
};

export default function ExtraFormItem({ el }) {
  const dispatch = useDispatch();
  const handleNewColumn = (e) =>
    dispatch(
      addNewColumn({
        id: e.currentTarget.id,
        label: e.currentTarget.getAttribute("label"),
      })
    );

  return (
    <Grid item xs={12} sm={6} md={3}>
      {el[1].isShown ? (
        <Field name={el[1].id} validate={validate(mappedSchemas[el[1].id])}>
          {({ field, form: { touched, errors }, meta }) => (
            <ExtraColumnForm
              buttonId={el[0]}
              id={el[1].formId}
              label={el[1].label}
              name={el[1].id}
              onChange={field.onChange}
              value={field.value}
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
              required
            />
          )}
        </Field>
      ) : (
        <Button id={el[0]} label={el[1].label} onClick={handleNewColumn}>
          <AddRoundedIcon />
          {el[1].label}
        </Button>
      )}
    </Grid>
  );
}
