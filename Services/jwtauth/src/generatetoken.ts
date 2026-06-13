import  jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

class generatetoken{
    private accesskey:string
    private refreshkey:string

    constructor(){
        this.accesskey=process.env.ACCESS_KEY as string
        this.refreshkey=process.env.REFRESH_KEY as string
    }

    access(id:string,auth:string){
        return jwt.sign(
            {id:id,auth:auth},
            this.accesskey,
            {expiresIn:"5m"}
        )
    }

    refresh(id:string,auth:string){
        return jwt.sign(
            {id:id,auth:auth},
            this.refreshkey,
            {expiresIn:"7d"}
        )
    }


}

export const tokengenerate=new generatetoken()