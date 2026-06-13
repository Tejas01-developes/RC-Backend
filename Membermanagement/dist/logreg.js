import { mysqlconnect } from 'DBconnect';
import bcrypt from 'bcrypt';
export const registermember = async (req, resp) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        resp.status(400).json({ succes: false, message: "Fields are missing" });
        return;
    }
    const hash = await bcrypt.hash(password, 10);
    const userid = crypto.randomUUID();
    mysqlconnect.query('insert into members (member_id,name,email,password) value (?,?,?,?)', [userid, name, email, hash], (err) => {
        if (err) {
            console.log(err);
            resp.status(400).json({ succes: false, message: "Registration failed" });
            return;
        }
        resp.status(200).json({ success: true, message: "registration success" });
        return;
    });
};
//# sourceMappingURL=logreg.js.map