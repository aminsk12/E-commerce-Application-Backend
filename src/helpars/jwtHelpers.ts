import jwt, { JwtPayload } from "jsonwebtoken";

const generateToken = (payload: any, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, {
    //     algorithm: "ES256",
    expiresIn: expiresIn,
  });
  return token;
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};