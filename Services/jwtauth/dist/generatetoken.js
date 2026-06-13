import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
class generatetoken {
    accesskey;
    refreshkey;
    constructor() {
        this.accesskey = process.env.ACCESS_KEY;
        this.refreshkey = process.env.REFRESH_KEY;
    }
    access(id, auth) {
        return jwt.sign({ id: id, auth: auth }, this.accesskey, { expiresIn: "5m" });
    }
    refresh(id, auth) {
        return jwt.sign({ id: id, auth: auth }, this.refreshkey, { expiresIn: "7d" });
    }
}
export const tokengenerate = new generatetoken();
//# sourceMappingURL=generatetoken.js.map