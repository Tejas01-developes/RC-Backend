import Razorpay from "razorpay";
import dotenv from 'dotenv';
dotenv.config();
export const payment = new Razorpay({
    key_id: process.env.RAZOR_API,
    key_secret: process.env.RAZOR_SECRET
});
//# sourceMappingURL=payment.js.map