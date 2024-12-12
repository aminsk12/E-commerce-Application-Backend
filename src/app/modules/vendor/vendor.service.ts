import { Admin, Customer, Prisma, UserStatus, Vendor } from "@prisma/client";
import { vendorSearchAbleFields } from "./vendor.constant";
import { IVenderFilterRequest } from "./vendor.interface";
import { IPaginationOptions } from "../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { prisma } from "../../../shared/prisma";

const getVendorFromDB = async (
  params: IVenderFilterRequest,
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
  const andCondition: Prisma.VendorWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: vendorSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.VendorWhereInput = { AND: andCondition };
  const result = await prisma.vendor.findMany({
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
  const total = await prisma.vendor.count({
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

const getVenderByIdFromDB = async (id: string): Promise<Vendor | null> => {
  const result = await prisma.vendor.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateVenderFromDB = async (
  id: string,
  data: Partial<Vendor>
): Promise<Vendor> => {
  await prisma.vendor.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.customer.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteVenderFromDB = async (id: string): Promise<Customer | null> => {
  await prisma.customer.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.customer.delete({
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

export const VendorService = {
  getVendorFromDB,
  getVenderByIdFromDB,
  updateVenderFromDB,
  deleteVenderFromDB,
};