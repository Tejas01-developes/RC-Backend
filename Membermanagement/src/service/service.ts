import {mysqlconnect} from 'DBconnect'
import { servicetypes } from '../types.js'


export const loginservice=(email:string):Promise<any>=>{

return new Promise((resolve,reject)=>{
    mysqlconnect.query(
        'select password,name,auth,member_id,name from members where email= ?',
        [email],
        (err,res)=>{
            if(err){
               return reject(err)
            }
            const row=res as any[]
            if(row.length === 0){
               return resolve(null)
            }else{
                resolve(row[0]);
            }
        }
    )
})
}

export const findrefresh=(memberid:string):Promise<servicetypes | null>=>{
    return new Promise((resolve,reject)=>{
        mysqlconnect.query(
            'select token,expired,member_id from refresh where member_id = ?',
            [memberid],
            (err,res)=>{
                if(err){
                    return reject(err)
                }
                const row=res as any[]
                if(row.length === 0){
                    return resolve(null)
                }else{
                    return resolve(row[0])
                }
            }
        )
    })
    
}

export const inserttokenservice=(memberid:string,token:string,name:string)=>{
    return new Promise((resolve,reject)=>{
        const id=crypto.randomUUID()
mysqlconnect.query(
    'insert into refresh (id,member_id,name,token,added_at,expired) values (?,?,?,?,now(),DATE_ADD(now(),interval 7 day))',
    [id,memberid,name,token],
    (err)=>{
        if(err){
            return reject(err)
        }else{
            return resolve("token added")
        }

    }
)
    })
}

export const updatetokenservice=(token:string,memberid:string)=>{
    return new Promise((resolve,reject)=>{
mysqlconnect.query(
    'update refresh set token=?,added_at=now(),expired=date_add(now(),interval 7 day) where member_id = ? ',
    [token,memberid],
    (err)=>{
        if(err){
            return reject(err)
        }else{
            return resolve("token updated")
        }

    }
)
    })
}

