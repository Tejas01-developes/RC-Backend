import {mysqlconnect} from 'DBconnect'
import bcrypt from 'bcrypt'
import { Request, Response } from "express";
import { findrefresh, inserttokenservice, loginservice, updatetokenservice } from '../service/service.js';
 import {tokengenerate} from 'jwtauth';
import { container } from '../bgw/bgcontainer.js';



export const registermember=async(req:Request,resp:Response):Promise<void>=>{
    const{name,email,password,auth}=req.body as {
        name:string,
        email:string,
        password:string,
        auth:string
    }
    if(!name || !email || !password){
        resp.status(400).json({success:false,message:"Fields are missing"})
          return
   }
   const hash:string=await bcrypt.hash(password,10)
   const userid:string=crypto.randomUUID()
   const authtype:string=auth? auth: "Member"
   mysqlconnect.query(
    'insert into members (member_id,name,email,password,auth) value (?,?,?,?,?)',
[userid,name,email,hash,authtype],
async(err)=>{
    if(err){
        console.log(err)
        resp.status(400).json({success:false,message:"Registration failed"})
        return
    }
    resp.status(200).json({success:true,message:"registration success"})
   await container.add({
        to:email,
        subject:"Welcome to Run club",
        text:`Welcome to our club and this is your memberid ${userid}`
    })
    return
}
   )
}

export const loginmember=async(req:Request,resp:Response)=>{
    const{email,password}=req.body as {
        email:string,
        password:string
    }
    if(!email || !password){
        resp.status(400).json({success:false,message:"Fields are missing"})
          return
   }
   try{
   const user=await loginservice(email);
   if(!user){
    resp.status(400).json({success:false,message:"user is missing"})
          return 
   }
const compare=await bcrypt.compare(password,user.password)
if(!compare){
    resp.status(400).json({success:false,message:"password is incorrect"})
    return 
}
const access:string=tokengenerate.access(user.member_id,user.auth)
let refresh:string;

const refreshcheck=await findrefresh(user.member_id)
if(!refreshcheck){
    refresh=tokengenerate.refresh(user.member_id,user.auth)
    await inserttokenservice(user.member_id,refresh,user.name)
}else{
    const now=Date.now();
    const expired_at=refreshcheck.expired

    if(now > expired_at){
        refresh=tokengenerate.refresh(user.member_id,user.auth)
        await updatetokenservice(user.member_id,refresh)
    }else{
        refresh=refreshcheck.token
    }
}
resp.cookie("refresh",refresh,{
    httpOnly:true,
    sameSite:"lax",
    secure:true,
    path:"/"
})

resp.status(200).json({success:true,message:"Login succesfull",access})
return 
   }catch(err){
    console.log(err)
    resp.status(400).json({success:false,message:"login failed"})
    return 
   }
}