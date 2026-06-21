import express from 'express';
import cors from 'cors';
import 'DBconnect';
import './bgw/bgsetup.js';
import router from './Route/router.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true
}));
app.use("/apis", router);
app.listen(3000, async () => {
    console.log("server started on the port 3000");
});
//# sourceMappingURL=app.js.map