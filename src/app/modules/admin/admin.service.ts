import { Admin, Prisma, UserStatus } from "@prisma/client"
import { adminSearchAbleFields } from "./admin.conostance";
import { pagginationHelper } from "../../../helpars/paginationHelper";
import { prisma } from "../../../shared/prisma";
import { IAdminFilterRequest } from "./admin.interface";
import { IPaginationsOptions } from "../../interfaces/paginations";


const getAllAdminFromDB = async (params: IAdminFilterRequest, options: IPaginationsOptions) => {
    const { searchTerm, ...filterData } = params
    const andConditons: Prisma.AdminWhereInput[] = [];
    const { limit, page, skip } = pagginationHelper.calculatePaginations(options)


    console.log('options',options)

    {// [
        //     {
        //         name: {
        //             contains: params.searchTerm,
        //             mode: 'insensitive'
        //         }
        //     },
        //     {
        //         email: {
        //             contains: params.searchTerm,
        //             mode: 'insensitive'
        //         }
        //     }
        // ]
    }
    if (params.searchTerm) {
        andConditons?.push({
            OR: adminSearchAbleFields?.map(field => ({
                [field]: {
                    contains: params?.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }
    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        })
    }
    andConditons.push({
        isDeleted: false
    })

    const whereConditons: Prisma.AdminWhereInput = { AND: andConditons }

    const result = await prisma.admin.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'asc'
        }
    });
    const total = await prisma.admin.count({
        where: whereConditons
    })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };

}

const getASingleAdminFromDB = async (id: string): Promise<Admin | null> => {
    const result = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false
        }
    })
    return result
}

const updateAdminInToDB = async (id: string, data: Partial<Admin>): Promise<Admin | null> => {

    await prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    })
    const result = await prisma.admin.update({
        where: {
            id,
            isDeleted: false
        },
        data
    })
    return result
}

const deleteAdminFromDB = async (id: string): Promise<Admin | null> => {
    //  console.log('Admin delete')
    await prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    })
    const result = await prisma.$transaction(async (transctionClient) => {
        const adminDataDelete = await transctionClient.admin.delete({
            where: {
                id,
                isDeleted: false
            },
        });

        await transctionClient.user.delete({
            where: {
                email: adminDataDelete.email
            }
        })

        return adminDataDelete
    })
    return result
}

const softDeleteAdminFromDB = async (id: string): Promise<Admin | null> => {
    //  console.log('Admin delete')
    await prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    })
    const result = await prisma.$transaction(async (transctionClient) => {
        const adminDataDelete = await transctionClient.admin.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        });

        await transctionClient.user.update({
            where: {
                email: adminDataDelete.email
            },
            data: {
                status: UserStatus.DELETED
            }
        })

        return adminDataDelete
    })
    return result
}
export const adminServices = {
    getAllAdminFromDB,
    getASingleAdminFromDB,
    updateAdminInToDB,
    deleteAdminFromDB,
    softDeleteAdminFromDB
}