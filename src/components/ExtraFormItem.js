import React from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getExtraFormsAsArray } from "../redux/ui/uiSlice";
import ExtraColumnForm from "./ExtraColumnForm";
import ExtraColumnButton from "./ExtraColumnButton";

export default function ExtraFormItem({ el }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      {el[1].isShown ? (
        <ExtraColumnForm
          buttonId={el[0]}
          id={el[1].formId}
          label={el[1].label}
        />
      ) : (
        <ExtraColumnButton id={el[0]} label={el[1].label}>
          <>
            <AddRoundedIcon />
            {el[1].label}
          </>
        </ExtraColumnButton>
      )}
    </Grid>
  );
}
