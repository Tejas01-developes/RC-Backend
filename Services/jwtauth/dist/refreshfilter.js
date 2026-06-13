import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { tokengenerate } from './generatetoken.js';
dotenv.config();
export const refreshfilter = (req, resp) => {
    const token = req.cookies.refresh;
    if (!token) {
        resp.status(400).json({ success: false, message: "refresh token is not there" });
        return;
    }
    const decode = jwt.verify(token, process.env.REFRESH_KEY);
    const access = tokengenerate.access(decode.id, decode.auth);
    resp.status(200).json({ success: true, message: "access token generated", access });
    return;
};
//# sourceMappingURL=refreshfilter.js.map