import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SignInBodyType,
  SignUpBodyType,
  confirmationApiBodyType,
  resetPassConfirmBodyType,
  type ResetPassBodyType,
} from "../../lib/types";
import { AuthService } from "../../sevices/auth.service";
import { AuthForm } from "../AuthForm/AuthForm";
import "./Auth.scss";

type propsType = {
  signIn?: boolean;
  forgotPass?: boolean;
};

export const Auth = ({ signIn, forgotPass }: propsType) => {
  const [openLoader, setOpenLoader] = useState<boolean>(false);
  const [openBar, setOpenBar] = useState<boolean>(false);
  const [severity, setSeverity] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isEmailEmpty, setIsEmailEmpty] = useState<boolean>(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(true);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [confirmationCodeError, setConfirmationCodeError] =
    useState<string>("");
  const [isConfirmationCodeEmpty, setIsConfirmationCodeEmpty] =
    useState<boolean>(true);
  const [staySigned, setStaySigned] = useState<boolean>(true);

  const navigate = useNavigate();

  // Form validation

  const validateEmail = (email: string): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else if (email.length < 12) {
      setEmailError("Email length should be at least 12 characters");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string): void => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password should be at least 8 characters long and contain at least one letter, one number and one symbol"
      );
    } else {
      setPasswordError("");
    }
  };

  const onInputEmailValid = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    !signIn && validateEmail(emailValue);
    setIsEmailEmpty(emailValue === "");
    signIn && setEmailError("");

    if (
      !signIn &&
      emailError &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) &&
      emailValue.length >= 12
    ) {
      setEmailError("");
    }
  };

  const onInputPassValid = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    !signIn && validatePassword(passwordValue);
    setIsPasswordEmpty(passwordValue === "");
    if (
      !signIn &&
      passwordError &&
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        passwordValue
      )
    ) {
      setPasswordError("");
    }
    signIn && setPasswordError("");
  };

  //Show password

  const [seePass, setSeePass] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setSeePass(!seePass);
  };

  //Post Requests

  const validateConfirmationCode = (code: string): void => {
    const codeRegex = /^\d{6}$/;

    if (!codeRegex.test(code)) {
      setConfirmationCodeError("Must be 6 digits");
    } else {
      setConfirmationCodeError("");
    }
  };

  const onInputConfirmationCodeValid = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const codeValue = event.target.value;
    setConfirmationCode(codeValue);
    setIsConfirmationCodeEmpty(codeValue === "");
    validateConfirmationCode(codeValue);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //can be reviewed. Code is doubled in handleSign in for validation
    if (!isEmailSent) {
      isEmailEmpty && setEmailError("Required");
      isPasswordEmpty && setPasswordError("Required");
      if (isEmailEmpty || isPasswordEmpty) {
        return;
      }

      //Sign in can be removed
      !signIn && validateEmail(email);
      !signIn && validatePassword(password);

      if (emailError || passwordError) {
        return;
      }

      setOpenLoader(true);

      function makeid(length: number) {
        let result = "";
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
          counter += 1;
        }
        return result;
      }

      const body: SignUpBodyType = {
        email,
        password,
        username: makeid(5),
      };

      //Most of below code can be copied to the services file
      AuthService.signUp(
        body,
        setOpenBar,
        setSeverity,
        setAlertMessage,
        setIsEmailSent,
        setOpenLoader
      );
    } else {
      //Can be passed to confirmationCodeApi
      isConfirmationCodeEmpty && setConfirmationCodeError("Required");
      confirmationCode && validateConfirmationCode(confirmationCode);

      if (confirmationCodeError) {
        return;
      }

      setOpenLoader(true);

      const confirmationApiBody: confirmationApiBodyType = {
        email,
        confirmationCode,
      };

      AuthService.confirmationCodeApi(
        confirmationApiBody,
        setOpenBar,
        setAlertMessage,
        setSeverity,
        setOpenLoader,
        setIsEmailSent
      );
    }
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    isEmailEmpty && setEmailError("Required");
    isPasswordEmpty && setPasswordError("Required");
    if (isEmailEmpty || isPasswordEmpty) {
      return;
    }
    function makeid(length: number) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    }
    const body: SignInBodyType = {
      identifier: email,
      password,
    };

    setOpenLoader(true);

    AuthService.signIn(
      body,
      setOpenBar,
      setAlertMessage,
      setOpenLoader,
      setSeverity,
      staySigned
    );
  };

  const handleGoogleClickSignUp = async () => {
    AuthService.googleSignUp(setAlertMessage, setSeverity, setOpenBar);
  };

  const handleGoogleClickSignIn = async () => {
    AuthService.googleSignUp(setAlertMessage, setSeverity, setOpenBar);
  };

  const handleResetPass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailSent) {
      validateEmail(email);

      if (isEmailEmpty) {
        setEmailError("Required");
        return;
      }

      if (emailError) {
        return;
      }

      setOpenLoader(true);

      const body: ResetPassBodyType = {
        email,
      };

      const response = AuthService.resetPass(
        body,
        setOpenBar,
        setAlertMessage,
        setOpenLoader,
        setSeverity,
        setIsEmailSent
      );

      //This was written in AuthService.resetPass
      //but doesnt work, that's why was written here
      //setSeverity(true) and setOpenLoader(false);
      response
        .then((res) => {
          if (res?.status === 200) {
            setSeverity(true);
          }
        })
        .finally(() => {
          setOpenLoader(false);
        });
    } else {
      //Can be passed to confirmationCodeApi
      isConfirmationCodeEmpty && setConfirmationCodeError("Required");
      isPasswordEmpty && setPasswordError("Required");
      confirmationCode && validateConfirmationCode(confirmationCode);

      if (
        isPasswordEmpty ||
        confirmationCodeError ||
        isConfirmationCodeEmpty ||
        passwordError
      ) {
        return;
      }

      setOpenLoader(true);

      const resetPassConfirmBody: resetPassConfirmBodyType = {
        email,
        confirmationCode,
        password,
      };

      AuthService.resetPassConfirm(
        resetPassConfirmBody,
        setOpenBar,
        setAlertMessage,
        setSeverity,
        setOpenLoader,
        setIsEmailSent,
        navigate
      );
    }
  };

  const handleStaySigned = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStaySigned(event.target.checked);
  };

  return (
    <div className="container">
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <div className="custom-flex auth">
        <h2 className="auth__title">Authentication</h2>
        <AuthForm
          onInputConfirmationCodeValid={onInputConfirmationCodeValid}
          confirmationCodeError={confirmationCodeError}
          emailError={emailError}
          passwordError={passwordError}
          seePass={seePass}
          isEmailSent={isEmailSent}
          openLoader={openLoader}
          togglePasswordVisibility={togglePasswordVisibility}
          onInputPassValid={onInputPassValid}
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
          onInputEmailValid={onInputEmailValid}
          handleResetPass={handleResetPass}
          forgotPass={forgotPass}
          signIn={signIn}
          staySigned={staySigned}
          handleStaySigned={handleStaySigned}
          setStaySigned={setStaySigned}
        />
        {signIn ? (
          <div className="auth__bottom-wrapper custom-flex">
            <div className="auth__bottom-txt">
              <Link className="auth__bottom-txt" to="/sign-up">
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          <div className="auth__bottom-txt custom-flex">
            <Link className="auth__bottom-txt" to="/sign-in">
              Sign In
            </Link>
          </div>
        )}
      </div>
      <Snackbar
        open={openBar}
        autoHideDuration={6000}
        onClose={() => setOpenBar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenBar(false)}
          severity={severity ? "success" : "error"}
          sx={{
            width: "100%",
            textAlign: "center",
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
