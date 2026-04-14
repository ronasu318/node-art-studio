const mysql = require('mysql2/promise'); // 引入會講 SQL 的翻譯官
require('dotenv').config(); // 關鍵：這行會自動去讀取 .env 檔案

// 建立連線池 (Pool)，這比單一連線更穩定
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool; // 把這條水管分享出去