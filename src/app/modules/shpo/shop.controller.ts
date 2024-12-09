import { Request, Response } from "express";
import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../../../shared/sendResponnse";
import pick from "../../../shared/pick";
import { ShopService } from "./shop.service";
import { shopFilterableFields } from "./shop.const";


const createShop = catchAsync(async (req: Request, res: Response) => {
  const result = await ShopService.createShopIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop Created successfully!",
    data: result,
  });
});
const getShop = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, shopFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ShopService.getShopIntoDB(filters, options as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AllShop Get successfully!",
    data: result,
  });
});

const getShopById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShopService.getShopByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop Data fetched",
    data: result,
  });
});

const updateShop = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ShopService.updateShopFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated Successful ",
    data: result,
  });
});
const deleteShop = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ShopService.deleteShopFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete Successful",
    data: result,
  });
});

export const ShopController = {
  createShop,
  getShop,
  getShopById,
  updateShop,
  deleteShop,
};