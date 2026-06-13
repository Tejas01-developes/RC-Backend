import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
export const mysqlconnect = mysql.createPool({
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});
//# sourceMappingURL=index.js.map