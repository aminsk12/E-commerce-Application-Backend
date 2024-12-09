import { Request, Response } from "express";
import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../../../shared/sendResponnse";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Created successfully!",
    data: result,
  });
});
const getOrderByVendor = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrdersByVendorIdFromDB(req.body.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "vendor order get successfully!",
    data: result,
  });
});
const deleteOrderByCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.deleteOrderByCustomerFromDB(req.body.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Delete successfully!",
      data: result,
    });
  }
);

export const OrderController = {
  createOrder,
  getOrderByVendor,
  deleteOrderByCustomer,
};