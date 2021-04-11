import React from "react";
import Button from "@material-ui/core/Button";

export default function LoginButton({ className = "", ...rest }) {
  return (
    <Button className={className} {...rest}>
      Sign In
    </Button>
  );
}
