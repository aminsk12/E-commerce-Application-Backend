import { Prisma, Product } from "@prisma/client";
import { fileUploader } from "../../helpars/fileUploader";
import { paginationHelper } from "../../helpars/paginationHelper";
import { IFile } from "../../interfaces/file";
import { IPaginationOptions } from "../../interfaces/pagination";
import prisma from "../shared/prisma";
import { productSearchAbleFields } from "./product.const";
import { IProductFilterRequest } from "./product.interface";

const createProductIntoDB = async (req: any) => {
  const file = req.file as IFile[];

  if (file) {
    const uploadToCloudinary =
      await fileUploader.multepaleImageuploadToCloudinary(file);
    req.body.images = uploadToCloudinary;
  }
  const createdProductData = await prisma.product.create({
    data: req.body,
  });

  return createdProductData;
};

const getProductIntoDB = async (
  params: IProductFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  if (Object.keys(filterData).length > 0) {
    AND: Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
  }

  console.log(params);
  const andCondition: Prisma.ProductWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: productSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  andCondition.push({ isDeleted: false });

  const whereConditions: Prisma.ProductWhereInput = { AND: andCondition };
  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.product.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getProductByIdFromDB = async (id: string): Promise<Product | null> => {
  const result = await prisma.product.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

const updateProductFromDB = async (
  id: string,
  data: Partial<Product>
): Promise<Product> => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.product.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteProductFromDB = async (id: string): Promise<Product | null> => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const productDeletedData = await transactionClient.product.delete({
      where: {
        id,
      },
    });
    await transactionClient.user.delete({
      where: {
        id: productDeletedData.id,
      },
    });
    return productDeletedData;
  });
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getProductIntoDB,
  getProductByIdFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};