import { error } from "console";
import { NextFunction, Request, Response } from "express";
import path from "path";

const notFound = (req:Request, res:Response, next:NextFunction)=>{
    res.status(400).json({
        success: false,
        message: "API NOT FOUND!",
        error:{
            path: req.originalUrl
        }
    })
};

export default notFound;