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

// 3. 404 處理器 (必須放在所有路由之後！)
app.use((req, res) => {
    res.status(404).render('p404', { title: '頁面不存在' });
});

// index.js 底部
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`------------------------------------`);
    console.log(`🚀 藝術工作室已在 Port ${PORT} 上線！`);
    console.log(`------------------------------------`);
});