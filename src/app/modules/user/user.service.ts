import { UserRole } from "@prisma/client"
import * as bcrypt from 'bcrypt'
import { prisma } from "../../../shared/prisma"


const createAdmin = async (data: any) => {
    const haspasword: string = await bcrypt.hash(data.password, 12)
    console.log({ haspasword })

    const userData = {
        email: data.admin.email,
        password: haspasword,
        role: UserRole.ADMIN
    };

    const result = await prisma.$transaction(async (transctionClient) => {
        await transctionClient.user.create({
            data: userData
        });

        const createAdminData = await transctionClient.admin.create({
            data: data.admin
        })

        return createAdminData
    })

    return result
}

export const userService = {
    createAdmin
}