import express from 'express';

import 'DBconnect';
import router from './Route/router.js';



const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/apis",router)


app.listen(3000,async()=>{
console.log("server started on the port 3000")
})