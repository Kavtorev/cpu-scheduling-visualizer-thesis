import React from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getExtraFormsAsArray } from "../redux/ui/uiSlice";
import ExtraColumnForm from "./ExtraColumnForm";
import ExtraColumnButton from "./ExtraColumnButton";

export default function ExtraFormsList() {
  const extraForms = useSelector(getExtraFormsAsArray);
  return (
    <>
      {extraForms.map((el) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={Math.random() + Date.now()}>
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
    </>
  );
}
