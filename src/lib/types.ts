//Auth start

export type BodyType = {
  email: string;
  password: string;
  staySigned: boolean;
  username: string;
};

export type SignUpBodyType = Omit<BodyType, "staySigned">;
export type confirmationApiBodyType = {
  email: string;
  confirmationCode: string;
};
export type SignInBodyType = {
  identifier: string;
  password: string;
};
export type ResetPassBodyType = Pick<BodyType, "email">;
export type resetPassConfirmBodyType = confirmationApiBodyType & {
  password: string;
};

//Auth end
