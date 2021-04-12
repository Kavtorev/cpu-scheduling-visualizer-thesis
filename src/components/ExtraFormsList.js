import React from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getExtraFormsAsArray } from "../redux/ui/uiSlice";
import ExtraColumnForm from "./ExtraColumnForm";
import ExtraColumnButton from "./ExtraColumnButton";
import ExtraFormItem from "./ExtraFormItem";

export default function ExtraFormsList() {
  const extraForms = useSelector(getExtraFormsAsArray);
  return (
    <>
      {extraForms.map((el, i) => {
        return <ExtraFormItem el={el} key={Math.random() + Date.now()} />;
      })}
    </>
  );
}
