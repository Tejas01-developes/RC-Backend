import express from "express";
import { loginmember, registermember } from "../controller/logreg.js";
import { addevent, formfilling, getevent } from "../controller/formfilling.js";
import { refreshfilter } from "jwtauth";
const router = express.Router();
router.post("/register", registermember);
router.post("/login", loginmember);
router.post("/form", formfilling);
router.post("/task", addevent);
router.post("/refresh", refreshfilter);
router.get("/gettask", getevent);
export default router;
//# sourceMappingURL=router.js.map