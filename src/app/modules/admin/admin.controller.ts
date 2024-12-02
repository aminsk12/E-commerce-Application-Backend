import {  RequestHandler } from "express"
import { adminServices } from "./admin.service"
import pick from "../../../shared/pick"
import { adminFilterableFilds } from "./admin.conostance"
import sendResponse from "../../../shared/sendResponnse";
import catchAsync from "../../../shared/catchAsync";
//import httpStatus from "http-status";


const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {
    const filters = pick(req.query, adminFilterableFilds)
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
    // console.log(options)
    const result = await adminServices.getAllAdminFromDB(filters, options)
    // res.status(200).json({
    //     success: true,
    //     message: "Admin retrive successfuly!",
    //     meta: result.meta,
    //     data: result.data
    // })
    sendResponse(res, {
        statusCode: 200, //httpStatus.OK ,
        success: true,
        message: "Admin retrive successfuly!",
        meta: result.meta,
        data: result.data
    })
})

const getASingleAdmin: RequestHandler = catchAsync(async (req, res) => {
    //console.log(req.params.id)
    const { id } = req.params;
    const result = await adminServices.getASingleAdminFromDB(id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin retrive successfuly by ID!",
        data: result
    })
})

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    // console.log('id:', id)
    // console.log('data:', req.body)
    const result = await adminServices.updateAdminInToDB(id, req.body)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin data updated successfuly!",
        data: result
    })
})

const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    //console.log('id:', id)
    const result = await adminServices.deleteAdminFromDB(id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin data deleted Data successfuly!",
        data: result
    })
})

const softDeleteAdmin: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    //console.log('id:', id)
    const result = await adminServices.softDeleteAdminFromDB(id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin data deleted Data successfuly!",
        data: result
    })
})

export const adminController = {
    getAllAdmin,
    getASingleAdmin,
    updateAdmin,
    deleteAdmin,
    softDeleteAdmin
}