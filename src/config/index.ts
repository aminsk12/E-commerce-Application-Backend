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
  emailSender: {
    email: process.env.SENDER_EMAIL,
    app_password: process.env.SENDER_APP_PASS,
  },
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,

  amr_pay_key: process.env.AMRPAYKey,
  amr_pay_id: process.env.AMRPAYID,
  amr_pay_url: process.env.AMRPAYURL,
  amr_pay_verify_url: process.env.AMRPAYURLVERYFIURL,

  cancel_url: process.env.CANCELPAGE,
  error_url: process.env.ERRORPAGE,
  success_url: process.env.SUCCESSPAGE,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
};