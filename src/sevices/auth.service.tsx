import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  SignInBodyType,
  SignUpBodyType,
  confirmationApiBodyType,
  resetPassConfirmBodyType,
  type ResetPassBodyType,
} from "../lib/types";
import { axiosInstance } from "./axios";
import { signInWithGoogle } from "./firebase";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export const AuthService = {
  signUp: async (
    body: SignUpBodyType,
    setOpenBar: SetState<boolean>,
    setSeverity: SetState<boolean>,
    setAlertMessage: SetState<string>,
    setIsEmailSent: SetState<boolean>,
    setOpenLoader: SetState<boolean>
  ) => {
    try {
      const response = await axiosInstance.post("auth/local/register", body);

      console.log(response);

      setIsEmailSent(true);
      setSeverity(true);
      setAlertMessage("Successfully logged in");
      setOpenBar(true);
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("user", body.email);
      setTimeout(() => {
        location.replace("/");
      }, 1000);
      return response;
    } catch (error) {
      console.log(error);
      if ((error as any).message === "Request failed with status code 400") {
        setAlertMessage("This email has already been registered");
      } else {
        setAlertMessage("Something went wrong. Try again");
      }

      setSeverity(false);
      setOpenBar(true);
    } finally {
      setOpenLoader(false);
    }
  },
  confirmationCodeApi: async (
    body: confirmationApiBodyType,
    setOpenBar: SetState<boolean>,
    setAlertMessage: SetState<string>,
    setSeverity: SetState<boolean>,
    setOpenLoader: SetState<boolean>,
    setIsEmailSent: SetState<boolean>
  ) => {
    try {
      const response = await axiosInstance.post(
        "registration/signup-confirm",
        body
      );

      sessionStorage.setItem("token", `Bearer ${response.data.token}`);
      sessionStorage.setItem("user", body.email);

      setSeverity(true);
      setAlertMessage("Successfully signed up");
      setOpenBar(true);

      setIsEmailSent(false);

      // navigate("/");
      window.location.href = "/";

      return response;
    } catch (error) {
      if ((error as Error).message === "Request failed with status code 409") {
        setAlertMessage("Incorrect confirmation code");
      } else {
        setAlertMessage("Something went wrong. Try again");
      }

      setOpenBar(true);
      setSeverity(false);
    } finally {
      setOpenLoader(false);
    }
  },
  signIn: async (
    body: SignInBodyType,
    setOpenBar: SetState<boolean>,
    setAlertMessage: SetState<string>,
    setSeverity: SetState<boolean>,
    setOpenLoader: SetState<boolean>,
    staySigned: boolean
  ) => {
    try {
      const response = await axiosInstance.post("auth/local", body);
      setAlertMessage("Successfully logged in");
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("user", body.identifier);
      setTimeout(() => {
        location.replace("/");
      }, 1000);

      return response;
    } catch (error) {
      console.log(error);

      if ((error as any).message === "Request failed with status code 400") {
        setAlertMessage("No user found for this email/password");
      } else {
        setAlertMessage("Something went wrong. Try again");
      }
      setSeverity(false);
      setOpenBar(true);
    } finally {
      setOpenLoader(false);
    }
  },
  resetPass: async (
    body: ResetPassBodyType,
    setOpenBar: SetState<boolean>,
    setAlertMessage: SetState<string>,
    setSeverity: SetState<boolean>,
    setOpenLoader: SetState<boolean>,
    setIsEmailSent: SetState<boolean>
  ) => {
    try {
      const response = await axiosInstance.post(
        "registration/update-password",
        body
      );

      setSeverity(true);
      setIsEmailSent(true);
      setAlertMessage("Confirmation code has been sent to your email");

      setOpenBar(true);

      return response;
    } catch (error) {
      setSeverity(false);
      if ((error as Error).message === "Request failed with status code 409") {
        setAlertMessage("No user found for this email/password");
      } else {
        setAlertMessage("Something went wrong. Try again");
      }
      setOpenBar(true);
    } finally {
      setOpenLoader(false);
    }
  },
  resetPassConfirm: async (
    body: resetPassConfirmBodyType,
    setOpenBar: SetState<boolean>,
    setAlertMessage: SetState<string>,
    setSeverity: SetState<boolean>,
    setOpenLoader: SetState<boolean>,
    setIsEmailSent: SetState<boolean>,
    navigate: NavigateFunction
  ) => {
    try {
      const response = await axiosInstance.post(
        "registration/update-password-confirm",
        body
      );
      setSeverity(true);
      setAlertMessage("Password successfully updated");
      setOpenBar(true);
      setIsEmailSent(false);

      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);

      return response;
    } catch (error) {
      if ((error as Error).message === "Request failed with status code 409") {
        setAlertMessage("No user found for this email/password");
      } else {
        setAlertMessage("Something went wrong. Try again");
      }
      setSeverity(false);
      setOpenBar(true);
    } finally {
      setOpenLoader(false);
    }
  },
  //Test code
  //Google Sign Up Api does not properly (securely) work. This api was made temporarily
  googleSignUp: async (
    setAlertMessage: SetState<string>,
    setSeverity: SetState<boolean>,
    setOpenBar: SetState<boolean>
  ) => {
    try {
      // await signInWithGoogle();

      // setEmail(response.user.email || "");
      // const idToken: string = await response.user.getIdToken();

      // const response2 = await axiosInstance.post("", "", {
      //   headers: { idToken },
      // });

      // const response2 = await axios.post(
      //   "https://curvy-quilt-production.up.railway.app/registration/signup-google",
      //   { email: response.user.email }
      // );

      // localStorage.setItem("token", `Bearer ${response2.data.token}`);

      setSeverity(false);
      setAlertMessage("Google authentication is temporarily unavailable");
      setOpenBar(true);

      // navigate("/");
      // window.location.href = "/";
    } catch (error) {
      console.log(error);
      setAlertMessage("Something went wrong. Try again");
    }
  },
};
