import express from "express";
import { loginmember, registermember } from "../controller/logreg.js";
import { addevent, attaindence, dopayment, formfilling, getcount, getevent, setauth, verifypayment } from "../controller/formfilling.js";
import { accessfilter, refreshfilter } from "jwtauth";


const router = express.Router();



router.post("/register", registermember);
router.post("/login",loginmember);
router.post("/form",accessfilter,formfilling);
router.post("/task",accessfilter,addevent)
router.post("/refresh",refreshfilter)
router.post("/auth",accessfilter,setauth)
router.post("/payment",dopayment)
router.post("/verifypay",verifypayment)
router.patch("/status",attaindence)
router.get("/getevents",accessfilter,getevent)
router.get("/count",accessfilter,getcount)






export default router;