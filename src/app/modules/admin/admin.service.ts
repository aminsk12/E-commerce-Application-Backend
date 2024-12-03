import { Admin, Prisma, UserStatus } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../helpars/paginationHelper";
import prisma from "../shared/prisma";
import { IAdminFilterRequest } from "./admin.interface";
import { IPaginationOptions } from "../../interfaces/pagination";

const getAdminFromDB = async (
  params: IAdminFilterRequest,
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
  const andCondition: Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  andCondition.push({ isDeleted: false });

  const whereConditions: Prisma.AdminWhereInput = { AND: andCondition };
  const result = await prisma.admin.findMany({
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
  const total = await prisma.admin.count({
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

const getAdminByIdFromDB = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

const updateAdminFromDB = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteAdminFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });
    await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });
    return adminDeletedData;
  });
  return result;
};
const softDeleteAdminFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });
    await transactionClient.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return adminDeletedData;
  });
  return result;
};

export const AdminService = {
  getAdminFromDB,
  getAdminByIdFromDB,
  updateAdminFromDB,
  deleteAdminFromDB,
  softDeleteAdminFromDB,
};