import { Request, Response } from "express";
import catchAsync from "../../middlewares/catchAsync";
import { ProductService } from "./product.service";
import { productFilterableFields } from "./product.const";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponnse";
import pick from "../../../shared/pick";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProductIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "product Created successfully!",
    data: result,
  });
});
const getProductIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log("productAll", req.query);
  const filters = pick(req.query, productFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ProductService.getProductIntoDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AllProduct Get successfully!",
    data: result,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.getProductByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product Data fetched",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductService.updateProductFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated Successful ",
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductService.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete Successful",
    data: result,
  });
});

export const productController = {
  createProduct,
  getProductIntoDB,
  getProductById,
  updateProduct,
  deleteProduct,
};