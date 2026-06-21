import { mysqlconnect } from "DBconnect";
import { container } from "../bgw/bgcontainer.js";
import { payment } from "../razorpay/payment.js";
import crypto from 'crypto';
export const formfilling = async (req, resp) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        resp.status(400).json({ succes: false, message: "Fields are missing" });
        return;
    }
    const registerid = crypto.randomUUID();
    mysqlconnect.query('insert into formdata (registered_id,name,email,phoneno) values (?,?,?,?)', [registerid, name, email, phone], async (err) => {
        if (err) {
            console.log(err);
            resp.status(400).json({ success: false, message: "form filling failed" });
            return;
        }
        resp.status(200).json({ success: true, message: "Form filled" });
        await container.add({
            to: email,
            subject: "Slot Allocated",
            text: `Here is your slot id ${registerid}`
        });
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
export const getevent = (_req, resp) => {
    mysqlconnect.query('select * from ourevents', (err, res) => {
        if (err) {
            resp.status(400).json({ success: false, message: "get task from the database failed" });
            return;
        }
        resp.status(200).json({ success: true, res });
        return;
    });
};
export const getcount = (_req, resp) => {
    try {
        mysqlconnect.query('select max(count) as maxcount from formdata', (err, res) => {
            if (err) {
                resp.status(400).json({ success: false, message: "count of the user failed" });
                return;
            }
            const finalcount = res[0];
            resp.status(200).json({ success: true, finalcount });
            return;
        });
    }
    catch (err) {
        resp.status(400).json({ success: false, message: "count failed" });
        return;
    }
};
export const attaindence = (req, resp) => {
    console.log("attaindence api");
    const { email } = req.body;
    if (!email) {
        resp.status(400).json({ success: false, message: "email not recived" });
        return;
    }
    try {
        mysqlconnect.query('update formdata set status = "Present" where email= ?', [email], (err) => {
            if (err) {
                resp.status(400).json({ success: false, message: "update failed from the database side" });
                return;
            }
            resp.status(200).json({ success: true, message: "Marked present" });
            return;
        });
    }
    catch (err) {
        resp.status(400).json({ success: false, message: "update failed from the server side" });
        return;
    }
};
export const dopayment = async (_req, resp) => {
    const amount = 1;
    const details = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    };
    try {
        const order = await payment.orders.create(details);
        return resp.status(200).json({ success: true, order });
    }
    catch (err) {
        console.log(err);
        return resp.status(400).json({ success: false, message: "payment failed" });
    }
};
export const verifypayment = (req, resp) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return resp.status(400).json({ success: false, message: "payment stop" });
    }
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const signature = crypto
        .createHmac("sha256", process.env.RAZOR_SECRET)
        .update(text)
        .digest("hex");
    if (signature === razorpay_signature) {
        return resp.status(200).json({ success: true, message: "payment success" });
    }
    else {
        return resp.status(400).json({ success: false, message: "payment verification failed" });
    }
};
//# sourceMappingURL=formfilling.js.map