import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  expire_in: process.env.EXPIRES_IN,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  reset_pass_secret: process.env.RESET_PASS_SECRET,
  reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
  reset_pass_link: process.env.RESET_PASS_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_password: process.env.APP_PASSWORD,
  },
};