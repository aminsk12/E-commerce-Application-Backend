import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../shared/sendResponse";
import { userService } from "./user.service";
import { userFilterableFields } from "./user.const";
import pick from "../shared/pick";
import { IAuthUser } from "../../interfaces/common";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created successfully!",
    data: result,
  });
});
const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createCustomer(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer Created successfully!",
    data: result,
  });
});

const createVendor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createVendor(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor Created successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.changeProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

const getMyProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await userService.getMyProfile(user as IAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);

const updateMyProfie = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await userService.updateMyProfie(user as IAuthUser, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile updated!",
      data: result,
    });
  }
);

export const userController = {
  createCustomer,
  createAdmin,
  createVendor,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfie,
};