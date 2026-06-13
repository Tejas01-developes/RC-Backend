import { mysqlconnect } from 'DBconnect';
import bcrypt from 'bcrypt';
import { findrefresh, inserttokenservice, loginservice, updatetokenservice } from '../service/service.js';
import { tokengenerate } from 'jwtauth';
export const registermember = async (req, resp) => {
    const { name, email, password, auth } = req.body;
    if (!name || !email || !password) {
        resp.status(400).json({ succes: false, message: "Fields are missing" });
        return;
    }
    const hash = await bcrypt.hash(password, 10);
    const userid = crypto.randomUUID();
    const authtype = auth ? auth : "Member";
    mysqlconnect.query('insert into members (member_id,name,email,password,auth) value (?,?,?,?,?)', [userid, name, email, hash, authtype], (err) => {
        if (err) {
            console.log(err);
            resp.status(400).json({ succes: false, message: "Registration failed" });
            return;
        }
        resp.status(200).json({ success: true, message: "registration success" });
        return;
    });
};
export const loginmember = async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(400).json({ succes: false, message: "Fields are missing" });
        return;
    }
    try {
        const user = await loginservice(email);
        if (!user) {
            resp.status(400).json({ succes: false, message: "user is missing" });
            return;
        }
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            resp.status(400).json({ succes: false, message: "password is incorrect" });
            return;
        }
        const access = tokengenerate.access(user.member_id, user.auth);
        let refresh;
        const refreshcheck = await findrefresh(user.member_id);
        if (!refreshcheck) {
            refresh = tokengenerate.refresh(user.member_id, user.auth);
            await inserttokenservice(user.member_id, refresh, user.name);
        }
        else {
            const now = Date.now();
            const expired_at = refreshcheck.expired;
            if (now > expired_at) {
                refresh = tokengenerate.refresh(user.member_id, user.auth);
                await updatetokenservice(user.member_id, refresh);
            }
            else {
                refresh = refreshcheck.token;
            }
        }
        resp.cookie("refresh", refresh, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            path: "/"
        });
        resp.status(200).json({ succes: true, message: "Login succesfull", access });
        return;
    }
    catch (err) {
        console.log(err);
        resp.status(400).json({ succes: false, message: "login failed" });
        return;
    }
};
//# sourceMappingURL=logreg.js.map