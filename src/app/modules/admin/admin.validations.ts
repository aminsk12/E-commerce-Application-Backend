import { z } from "zod"

const adminUpdateValidate = z.object({
    body: z.object({
        name: z.string().optional(),
        contactNumber: z.string().optional()
    })
})
export const adminValidateSchemas ={
    adminUpdateValidate
}