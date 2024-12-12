import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import { VendorService } from "./vendor.service";
import { vendorFilterableFields } from "./vendor.constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponnse";

const getVendor = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, vendorFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  console.log("this is option", options);
  const result = await VendorService.getVendorFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor Data fetched",
    meta: result.meta,
    data: result.data,
  });
});
const getVendorById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VendorService.getVenderByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "vendor Data fetched",
    data: result,
  });
});

const updateVendor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await VendorService.updateVenderFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated Successful ",
    data: result,
  });
});
const deleteVendor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await VendorService.deleteVenderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete Successful",
    data: result,
  });
});

export const VendorController = {
  getVendor,
  getVendorById,
  updateVendor,
  deleteVendor,
};