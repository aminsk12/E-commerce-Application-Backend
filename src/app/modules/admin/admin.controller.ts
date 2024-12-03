import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";

const getAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    console.log("this is option", options);
    const result = await AdminService.getAdminFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data fetched",
      meta: result.meta,
      data: result.data,
    });
  }
);
const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getAdminByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data fetched",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.updateAdminFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated Successful ",
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.deleteAdminFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete Successful",
    data: result,
  });
});
const softDeleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.softDeleteAdminFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete Successful",
    data: result,
  });
});

export const AdminController = {
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};