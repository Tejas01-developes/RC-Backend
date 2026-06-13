import  jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
dotenv.config()

interface customreq extends Request{
id:string,
auth:string
}
export const accessfilter=(req:customreq,resp:Response,next:NextFunction):void=>{
const token=req.headers.authorization
const access=token?.split(" ")[1]

if(!access){
    resp.status(400).json({success:false,message:"access token is not there"})
    return 
}
const decode=jwt.verify(access,process.env.ACCESS_KEY as string) as JwtPayload
req.id=decode.id
req.auth=decode.auth
next()
}