import prisma from "../shared/prisma";
import jwt, { Secret } from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import config from "../../../config";
import { jwtHelpers } from "../../helpars/jwtHelpers";
import { UserStatus } from "@prisma/client";
import ApiError from "../../errors/ApiError";
import emailSender from "../shared/emailSender";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  console.log(isCorrectPassword);
  console.log(userData);

  if (!isCorrectPassword) {
    throw new Error("password incorrect");
  }

  const accessToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt_secret as string,
    config.expire_in as string
  );
  const refreshToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.REFRESH_TOKEN_SECRET as string,
    config.REFRESH_TOKEN_EXPIRES_IN as string
  );
  console.log(accessToken);

  return {
    accessToken,
    refreshToken,
    needPasswordChange: true,
  };
};

const refreshToken = async (token: string) => {
  let decodeData;
  try {
    decodeData = jwtHelpers.verifyToken(
      token,
      config.REFRESH_TOKEN_SECRET as string
    );
  } catch (error) {
    throw new Error("You are Not authorize");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: decodeData.id,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    { email: userData?.email, role: userData?.role },
    config.jwt_secret as string,
    config.expire_in as string
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: true,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

const forgotPassword = async (payload: { id: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.reset_pass_secret as string,
    config.reset_pass_token_expires_in as string
  );
  //console.log(resetPassToken)

  const resetPassLink =
    config.reset_pass_link + `?userId=${userData.id}&token=${resetPassToken}`;

  await emailSender(
    userData.email,
    `
      <div>
          <p>Dear User,</p>
          <p>Your password reset link 
              <a href=${resetPassLink}>
                  <button>
                      Reset Password
                  </button>
              </a>
          </p>

      </div>
      `
  );
  //console.log(resetPassLink)
};

const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  console.log({ token, payload });

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.reset_pass_secret as string
  );

  if (!isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
  }

  // hash password
  const password = await bcrypt.hash(payload.password, 12);

  // update into database
  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password,
    },
  });
};

export const AuthService = {
  loginUser,
  refreshToken,
  resetPassword,
  forgotPassword,
  changePassword,
};