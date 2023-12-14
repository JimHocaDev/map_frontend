import { Checkbox } from "@mui/material";
import React from "react";
import eyeNot from "../../assets/icons/eye-not.svg";
import eye from "../../assets/icons/eye.svg";
import signInIcon from "../../assets/icons/sign-in.svg";
import { Button } from "../Button/Button";
import "./AuthForm.scss";

type FormHandleType = (e: React.FormEvent<HTMLFormElement>) => void;
type InputHandleType = (event: React.ChangeEvent<HTMLInputElement>) => void;

type PropsType = {
  emailError: string;
  forgotPass?: boolean;
  passwordError: string;
  confirmationCodeError: string;
  seePass: boolean;
  signIn?: boolean;
  isEmailSent: boolean;
  openLoader: boolean;
  staySigned: boolean;
  handleResetPass: FormHandleType;
  onInputEmailValid: InputHandleType;
  handleSignIn: FormHandleType;
  handleSignUp: FormHandleType;
  onInputPassValid: InputHandleType;
  onInputConfirmationCodeValid: InputHandleType;
  togglePasswordVisibility: () => void;
  setStaySigned: React.Dispatch<React.SetStateAction<boolean>>;
  handleStaySigned: InputHandleType;
};

export const AuthForm = ({
  forgotPass,
  signIn,
  emailError,
  passwordError,
  seePass,
  isEmailSent,
  confirmationCodeError,
  openLoader,
  staySigned,
  onInputConfirmationCodeValid,
  handleResetPass,
  onInputEmailValid,
  handleSignIn,
  handleSignUp,
  handleStaySigned,
  onInputPassValid,
  togglePasswordVisibility,
}: PropsType) => {
  return (
    <>
      {forgotPass ? (
        <div className="auth__form-holder">
          <form onSubmit={handleResetPass} className="auth__form">
            {emailError && <p className="error-message">{emailError}</p>}
            <input
              disabled={isEmailSent}
              style={emailError ? { borderColor: "red", marginTop: 0 } : {}}
              onChange={onInputEmailValid}
              className="auth__second-code-input auth__second-code-input-2"
              placeholder="Enter your email address"
              type="text"
            />
            {/* This code doubled at line ~108 can be one components  */}
            {isEmailSent && (
              <>
                <input
                  type="text"
                  maxLength={6}
                  onChange={onInputConfirmationCodeValid}
                  placeholder="Confirmation Code"
                  className="auth__second-code-input auth__second-code-input-2"
                  style={confirmationCodeError ? { borderColor: "red" } : {}}
                  id="inputConfirmationCode"
                />
                <span className="error-message">{confirmationCodeError}</span>
                <label className="auth__password-label" htmlFor="inputPass">
                  {/* This code doubled at line ~132 can be one components  */}
                  <input
                    onChange={onInputPassValid}
                    placeholder="Password"
                    className="auth__password-input auth__password-input-1"
                    style={passwordError ? { borderColor: "red" } : {}}
                    id="inputPass"
                    type={seePass ? "text" : "password"}
                  />
                  <img
                    width={20}
                    className="auth__show-password-icon"
                    src={seePass ? eyeNot : eye}
                    alt="show password"
                    onClick={togglePasswordVisibility}
                  />
                </label>

                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
              </>
            )}
            <Button disabled={openLoader}>Reset password</Button>
          </form>
        </div>
      ) : (
        <div className="auth__form-holder">
          <div className="auth__txt-wrapper">
            <img src={signInIcon} alt="sign in" />
            <p className="auth__txt">
              {signIn ? "Sign In with email" : "Sign Up"}
            </p>
          </div>
          <form
            onSubmit={signIn ? handleSignIn : handleSignUp}
            className="auth__form"
          >
            {emailError && <p className="error-message">{emailError}</p>}
            <label className="auth__email-label" htmlFor="inputText">
              <input
                disabled={isEmailSent}
                onChange={onInputEmailValid}
                placeholder="Username"
                style={emailError ? { borderColor: "red" } : {}}
                className="auth__email-input"
                id="inputText"
                type="text"
              />
            </label>
            <label className="auth__password-label" htmlFor="inputPass">
              <input
                disabled={isEmailSent}
                onChange={onInputPassValid}
                placeholder="Password"
                className="auth__password-input"
                style={
                  passwordError && emailError
                    ? { borderColor: "red", borderTopColor: "transparent" }
                    : passwordError
                    ? { borderColor: "red", borderTopColor: "red" }
                    : {}
                }
                id="inputPass"
                type={seePass ? "text" : "password"}
              />
              <img
                width={20}
                className="auth__show-password-icon"
                src={seePass ? eyeNot : eye}
                alt="show password"
                onClick={togglePasswordVisibility}
              />
            </label>

            {passwordError && <p className="error-message">{passwordError}</p>}
            {/*confirmation code input*/}

            {signIn && (
              <div className="custom-flex">
                <Checkbox
                  checked={staySigned}
                  onChange={handleStaySigned}
                  inputProps={{ "aria-label": "controlled" }}
                  id="authCheck"
                />
                <label htmlFor="authCheck" className="auth__stay-sign">
                  Stay Signed in
                </label>
              </div>
            )}
            <Button disabled={openLoader}>
              {signIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
