import { CircularProgress } from "@mui/material";
import React, { ComponentPropsWithRef } from "react";
import "./Button.scss";

type ButtonProps = ComponentPropsWithRef<"button">;

export const Button = ({
  children,
  type = "submit",
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`button custom-flex ${disabled && "button--disabled"}`}
    >
      {disabled ? "Loading..." : children}
      {disabled && <CircularProgress size="1.25rem" />}
    </button>
  );
};
