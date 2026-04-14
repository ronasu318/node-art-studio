// index.js
const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); //嘿！幫我把所有網頁都套上那個外殼
const userRoutes = require('./routes/userRoutes'); // 引入剛寫好的轉接員

// 設定模板，EJS 模板引擎與版面配置 (Layout)，邏輯：告訴 Express 我們要用 EJS 當作「裝潢工具」 [cite: 138, 139]
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts); // 告訴程式預設外殼是 layout.ejs
app.set('layout', 'layout');  // 預設使用 layout.ejs 當外殼

// 設定翻譯官 (Middleware) - 處理表單與 JSON，這兩行必須放在 app.use('/users', ...) 之前
app.use(express.json()); // 解析 JSON 格式
app.use(express.urlencoded({ extended: true })); // 解析 HTML 表單 (Form) 送出的資料
app.use(express.static(path.join(__dirname, 'public'))); // 告訴 Express 哪裡可以找到 CSS，靜態檔案路徑(如果你有 CSS/圖片的話可以加這行)

// --- 路由開始 ---

// 1. 首頁， (這部分要在 404 之前)，路由邏輯：當有人輸入網址 "/" 時，要做什麼？ [cite: 51, 140]
app.get('/', (req, res) => {
    res.render('index', { title: '我的藝術工作室' });     // 渲染 views/index.ejs 這個畫面，並傳入標題資料
});

// 2. 使用者相關功能 (轉接到 userRoutes)，所有關於 /users 的請求，都交給 userRoutes 處理
app.use('/users', userRoutes); // 這裡不需要再寫一遍 pool.query 了，因為邏輯會寫在 Controller 裡

// 範例：你的 /users 路由
try {
  const [rows] = await pool.query('SELECT * FROM users');
  res.render('users/list', { users: rows });
} catch (err) {
  console.error("❌ 真正的資料庫錯誤原因：", err); // <--- 補上這一行
  res.send("資料庫讀取失敗");
}

// 3. 404 處理器 (必須放在所有路由之後！)
app.use((req, res) => {
    res.status(404).render('p404', { title: '頁面不存在' });
});

/*/ 建立一個專門看「使用者清單」的頁面
app.get('/users', async (req, res) => {
    try {
        // 3. 這就是那個陌生的 async/await！
        // 邏輯：請程式「等一下 (await)」，直到資料庫把資料傳回來
        const [rows] = await pool.query('SELECT * FROM users');

        // 4. 拿到資料後，把這一箱資料 (rows) 交給 ejs 檔案去擺盤
        res.render('users', { users: rows }); 
    } catch (err) {
        // 如果失敗（例如 XAMPP 沒開），就會跳到這裡
        console.error('資料庫連線出錯：', err);
        res.status(500).send('資料庫抓不到東西，請檢查 XAMPP 是否有開啟 MySQL');
    }
});

5. 啟動伺服器
const PORT = 3000;
app.listen(PORT, () => {
    console.log('------------------------------------');
    console.log(`🚀 伺服器已啟動：http://localhost:${PORT}`);
    console.log(`👥 使用者清單：http://localhost:${PORT}/users`);
    console.log('------------------------------------');
});
*/

// index.js 底部
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`------------------------------------`);
    console.log(`🚀 藝術工作室已在 Port ${PORT} 上線！`);
    console.log(`------------------------------------`);
});