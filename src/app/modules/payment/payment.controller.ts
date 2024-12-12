/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import { createPaymentLinkService } from "./payment.service";
import sendResponse from "../../../shared/sendResponnse";


const amrPayPayment = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await createPaymentLinkService.amrPayPayment(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "payment link get successfully ",
    data: result,
  });
});

const afterPaymentPage = catchAsync(async (req, res) => {
  const { userId, tnxId } = req.query;

  try {
    // Assume this service will return payment details if successful
    const paymentData = await createPaymentLinkService.afterPaymentPageDB(
      userId as string,
      tnxId as string
    );

    // Destructure the details from paymentData for easy reference
    const { payment_processor, bank_trxid, pg_txnid, mer_txnid, payment_type } =
      paymentData;

    // Render dynamic HTML with payment data and a link to the homepage
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Status</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
            h1 { color: #4CAF50; }
            p { font-size: 1rem; }
            .button { text-decoration: none; padding: 10px 20px; background-color: #4CAF50; color: #fff; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Payment Success</h1>
            <p><strong>Payment Processor:</strong> ${payment_processor}</p>
            <p><strong>Bank Transaction ID:</strong> ${bank_trxid}</p>
            <p><strong>PG Transaction ID:</strong> ${pg_txnid}</p>
            <p><strong>Merchant Transaction ID:</strong> ${mer_txnid}</p>
            <p><strong>Payment Type:</strong> ${payment_type}</p>
            <br>
            <a href="https://travel-tips-destination-guides-client.vercel.app/" class="button">Go to Homepage</a>
          </div>
        </body>
      </html>
    `);
  } catch (error: any) {
    // Error handling for payment failure
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Status</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
            h1 { color: #E74C3C; }
            p { font-size: 1rem; }
            .button { text-decoration: none; padding: 10px 20px; background-color: #3498DB; color: #fff; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Payment Failed</h1>
            <p>We encountered an error processing your payment.</p>
            <p>Please try again or contact support if the issue persists.</p>
            <br>
            <a href="https://travel-tips-destination-guides-client.vercel.app/" class="button">Go to Homepage</a>
          </div>
        </body>
      </html>
    `);
  }
});

const paymentFail = catchAsync(async (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Status</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
          h1 { color: #E74C3C; }
          p { font-size: 1rem; }
          .button { text-decoration: none; padding: 10px 20px; background-color: #3498DB; color: #fff; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Payment Failed</h1>
          <p>We encountered an error processing your payment.</p>
          <p>Please try again or contact support if the issue persists.</p>
          <br>
          <a href="https://travel-tips-destination-guides-client.vercel.app/" class="button">Go to Homepage</a>
        </div>
      </body>
    </html>
  `);
});
export const LinkControllers = {
  // stripePayment,
  paymentFail,
  afterPaymentPage,
  amrPayPayment,
};