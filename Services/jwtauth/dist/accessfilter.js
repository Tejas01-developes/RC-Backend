import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const accessfilter = (req, resp, next) => {
    const token = req.headers.authorization;
    const access = token?.split(" ")[1];
    console.log(access);
    if (!access) {
        resp.status(400).json({ success: false, message: "access token is not there" });
        return;
    }
    try {
        const decode = jwt.verify(access, process.env.ACCESS_KEY);
        req.id = decode.id;
        req.auth = decode.auth;
        console.log(req.id, req.auth);
        next();
    }
    catch (err) {
        resp.status(400).json({ success: false, message: "Token is invalid or expired" });
        return;
    }
};
//# sourceMappingURL=accessfilter.js.map