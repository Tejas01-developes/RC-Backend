import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const createtransport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL as string,
        pass:process.env.EMAIL_PASS as string
    }
})

export const sendemail=async(to:string,subject:string,text:string)=>{
   await createtransport.sendMail({
        from:process.env.EMAIL as string,
        to,
        subject,
        text
    })
}