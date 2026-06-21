import bull from "bull";
import dotenv from 'dotenv';
dotenv.config();
export const container = new bull("rc-bgw", `redis://${process.env.REDIS_HOST}:6379`);
//# sourceMappingURL=bgcontainer.js.map