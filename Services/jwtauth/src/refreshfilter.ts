import  jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Request, Response } from 'express';
import {tokengenerate} from './generatetoken.js';
dotenv.config()

export const refreshfilter=(req:Request,resp:Response):void=>{
const token=req.cookies.refresh


if(!token){
    resp.status(400).json({success:false,message:"refresh token is not there"})
    return 
}
const decode=jwt.verify(token,process.env.REFRESH_KEY as string) as JwtPayload
const access=tokengenerate.access(decode.id,decode.auth)
 resp.status(200).json({success:true,message:"access token generated",access})
 return
}