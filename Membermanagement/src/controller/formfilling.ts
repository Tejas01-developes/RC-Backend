import { mysqlconnect } from "DBconnect"
import { Request, Response } from "express"


export const formfilling=(req:Request,resp:Response):void=>{
const{name,email,phone}=req.body as {
    name:string,
    email:string,
    phone:string
}
if(!name || !email || !phone){
    resp.status(400).json({succes:false,message:"Fields are missing"})
    return
}
const registerid=crypto.randomUUID()
mysqlconnect.query(
    'insert into formdata (register_id,name,email,phoneno) values (?,?,?,?)',
    [registerid,name,email,phone],
    (err)=>{
        if(err){
             resp.status(400).json({success:false,message:"form filling failed"})
             return
        }
        resp.status(200).json({succes:true,message:"Form filled"})
return
    }
)
}

export const addevent=(req:Request,resp:Response):void=>{
    const{title,description,eventdate}=req.body as {
        title:string,
        description:string,
        eventdate:string
    }
    if(!title || !description){
        resp.status(400).json({succes:false,message:"Admin fill the proper task"})
        return 
    }
  const eventno=crypto.randomUUID()
    try{
    mysqlconnect.query(
        'insert into ourevents (eventno,title,description,eventdata) values (?,?,?,?)',
        [eventno,title,description,eventdate],
        (err)=>{
            if(err){
                console.log(err)
                resp.status(400).json({success:false,message:"task adding error"})
                return
            }
            resp.status(200).json({succes:true,message:"Task added"})
            return
        }
    )
}catch(err){
    resp.status(400).json({succes:false,message:"Task adding failed"})
    return
}
}

export const getevent=(req:Request,resp:Response)=>{
    mysqlconnect.query(
        'select * from ourevents',
        (err,res)=>{
            if(err){
                resp.status(400).json({succes:false,message:"get task from the database failed"})
                return
            }
            resp.status(200).json({succes:false,res})
            return
        }
    )
}





