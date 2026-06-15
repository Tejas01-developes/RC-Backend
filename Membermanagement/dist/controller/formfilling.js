import { mysqlconnect } from "DBconnect";
export const formfilling = (req, resp) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        resp.status(400).json({ succes: false, message: "Fields are missing" });
        return;
    }
    const registerid = crypto.randomUUID();
    mysqlconnect.query('insert into formdata (register_id,name,email,phoneno) values (?,?,?,?)', [registerid, name, email, phone], (err) => {
        if (err) {
            resp.status(400).json({ success: false, message: "form filling failed" });
            return;
        }
        resp.status(200).json({ success: true, message: "Form filled" });
        return;
    });
};
export const setauth = (req, resp) => {
    const id = req.id;
    const authorization = req.auth;
    console.log(id, authorization);
    if (!id || !authorization) {
        resp.status(400).json({ success: false, message: "Admin i can not get your id and authorization" });
        return;
    }
    if (authorization !== "Admin") {
        resp.status(400).json({ success: false, message: "You are  not Authorized" });
        return;
    }
    else {
        resp.status(200).json({ success: true, message: "Welcome Admine :)" });
        return;
    }
};
export const addevent = (req, resp) => {
    const { title, description, eventdate } = req.body;
    if (!title || !description || !eventdate) {
        resp.status(400).json({ success: false, message: "Admin fill the proper task" });
        return;
    }
    const eventno = crypto.randomUUID();
    try {
        mysqlconnect.query('insert into ourevents (eventno,title,description,eventdata) values (?,?,?,?)', [eventno, title, description, eventdate], (err) => {
            if (err) {
                console.log(err);
                resp.status(400).json({ success: false, message: "task adding error" });
                return;
            }
            resp.status(200).json({ success: true, message: "Task added" });
            return;
        });
    }
    catch (err) {
        resp.status(400).json({ success: false, message: "Task adding failed" });
        return;
    }
};
export const getevent = (req, resp) => {
    mysqlconnect.query('select * from ourevents', (err, res) => {
        if (err) {
            resp.status(400).json({ success: false, message: "get task from the database failed" });
            return;
        }
        resp.status(200).json({ success: true, res });
        return;
    });
};
//# sourceMappingURL=formfilling.js.map