import React from "react";
import Grid from "@material-ui/core/Grid";
import { Field } from "formik";
import { validate } from "../../validation";
import TextInput from "./TextInput";

export default function InputItem({ el }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Field name={el.name} validate={validate(el.schema)}>
        {({ field, form: { touched, errors }, meta }) => (
          <TextInput
            id={el.id}
            label={el.label}
            name={el.name}
            onChange={field.onChange}
            value={field.value}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            required
            type="number"
          />
        )}
      </Field>
    </Grid>
  );
}
