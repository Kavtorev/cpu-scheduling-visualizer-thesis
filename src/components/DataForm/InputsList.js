import React, { memo } from "react";
import InputItem from "./InputItem";

export default memo(function InputsList({ inputs }) {
  console.log("inputs", inputs);
  return (
    <>
      {inputs.map((el, i) => {
        return <InputItem el={el} key={Math.random() + Date.now()} />;
      })}
    </>
  );
});
