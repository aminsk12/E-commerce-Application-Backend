import { Admin, Customer, Prisma, UserStatus } from "@prisma/client";
import { ICustomerFilterRequest } from "./customer.interface";
import { customerSearchAbleFields } from "./customer.constant";
import { IPaginationOptions } from "../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { prisma } from "../../../shared/prisma";

const getCustomerFromDB = async (
  params: ICustomerFilterRequest,
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
  const andCondition: Prisma.CustomerWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: customerSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.CustomerWhereInput = { AND: andCondition };
  const result = await prisma.customer.findMany({
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

    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      contactNumber: true,
      orders: {
        select: {
          id: true,
        },
      },
      reviews: {
        select: {
          id: true,
        },
      },
      cart: {
        select: {
          id: true,
        },
      },
      user: true,
      followedShops: {
        select: {
          id: true,
        },
      },
      recentView: {
        select: {
          id: true,
        },
      },
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const total = await prisma.customer.count({
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

const getCustomerByIdFromDB = async (id: string): Promise<Customer | null> => {
  const result = await prisma.customer.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateCustomerFromDB = async (
  id: string,
  data: Partial<Customer>
): Promise<Customer> => {
  await prisma.customer.findUniqueOrThrow({
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

const deleteCustomerFromDB = async (id: string): Promise<Customer | null> => {
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

export const CustomerService = {
  getCustomerFromDB,
  getCustomerByIdFromDB,
  updateCustomerFromDB,
  deleteCustomerFromDB,
};