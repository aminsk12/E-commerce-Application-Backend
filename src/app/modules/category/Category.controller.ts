import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import { Request, Response } from "express";
import { CategoryServices } from "./Category.service";
import sendResponse from "../../../shared/sendResponnse";

const createItemCategory = catchAsync(async (req: Request, res: Response) => {
  const itemCategory = await CategoryServices.createItemCategory(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: " Category Created Successfully",
    data: itemCategory,
  });
});

const getAllItemCategories = catchAsync(async (req, res) => {
  const itemCategory = await CategoryServices.getAllItemCategories();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category Retrieved Successfully",
    data: itemCategory,
  });
});

const getItemCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await CategoryServices.getItemCategoryById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: " Category Retrieved Successfully",
    data: itemCategory,
  });
});

const updateItemCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await CategoryServices.updateItemCategory(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: " Category updated successfully",
    data: itemCategory,
  });
});

const deleteItemCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await CategoryServices.deleteItemCategory(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: " Category Deleted Successfully",
    data: itemCategory,
  });
});

export const CategoryControllers = {
  createItemCategory,
  getAllItemCategories,
  getItemCategoryById,
  updateItemCategory,
  deleteItemCategory,
};