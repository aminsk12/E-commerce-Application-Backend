import { Category } from "@prisma/client";
import { IFile } from "../../interfaces/file";
import { fileUploader } from "../../../helpars/fileUploader";
import { prisma } from "../../../shared/prisma";


const createItemCategory = async (req: any) => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.image = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.category.create({ data: req.body });
  return result;
};

const getAllItemCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const getItemCategoryById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateItemCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category> => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteItemCategory = async (id: string): Promise<Category | null> => {
  await prisma.customer.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const deleteCategory = await prisma.category.delete({
    where: {
      id: id,
    },
  });

  return deleteCategory;
};

export const CategoryServices = {
  createItemCategory,
  getAllItemCategories,
  getItemCategoryById,
  updateItemCategory,
  deleteItemCategory,
};