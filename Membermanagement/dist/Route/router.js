import express from "express";
import { loginmember, registermember } from "../controller/logreg.js";
import { addevent, formfilling, getevent, setauth } from "../controller/formfilling.js";
import { accessfilter, refreshfilter } from "jwtauth";
const router = express.Router();
router.post("/register", registermember);
router.post("/login", loginmember);
router.post("/form", accessfilter, formfilling);
router.post("/task", accessfilter, addevent);
router.post("/refresh", refreshfilter);
router.post("/auth", accessfilter, setauth);
router.get("/getevents", accessfilter, getevent);
export default router;
//# sourceMappingURL=router.js.map