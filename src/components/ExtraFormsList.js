import React, { memo } from "react";
import { useSelector } from "react-redux";
import { getExtraFormsAsArray } from "../redux/ui/uiSlice";
import ExtraFormItem from "./ExtraFormItem";

export default memo(function ExtraFormsList() {
  const extraForms = useSelector(getExtraFormsAsArray);
  return (
    <>
      {extraForms.map((el, i) => {
        return <ExtraFormItem el={el} key={Math.random() + Date.now()} />;
      })}
    </>
  );
});
