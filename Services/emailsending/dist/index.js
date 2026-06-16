import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const createtransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});
export const sendemail = async (to, subject, text) => {
    await createtransport.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text
    });
};
//# sourceMappingURL=index.js.map