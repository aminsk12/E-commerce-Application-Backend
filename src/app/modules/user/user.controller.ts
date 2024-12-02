import { Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";

const createAdmin: RequestHandler = catchAsync(async (req ,res) => {
    //console.log(req.body)

    const result = await userService.createAdmin(req.body)
    res.status(200).json({
        success: true,
        message: "Admin created successfuly!",
        data: result
    })

})

export const userController = {
    createAdmin
}