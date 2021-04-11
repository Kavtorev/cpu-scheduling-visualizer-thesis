import React from "react";
import Button from "@material-ui/core/Button";

export default function RegisterButton({ className = "", ...rest }) {
  return (
    <Button className={className} {...rest}>
      Sign Up
    </Button>
  );
}
