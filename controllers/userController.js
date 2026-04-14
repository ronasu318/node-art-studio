//(負責去倉庫拿菜)，邏輯：定義一個專門拿所有使用者的函式

const pool = require('../config/db'); // 引入水管

// 1. 顯示清單
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
        res.render('users/list', { title: '成員清單', users: rows });
    } catch (err) {
        res.status(500).send('資料庫讀取失敗');
    }
};

// 2. 顯示新增表單
exports.showCreateForm = (req, res) => {
    res.render('users/create', { title: '新增成員' });
};

// 3. 處理新增資料
exports.addUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.redirect('/users');
    } catch (err) {
        res.status(500).send('新增失敗');
    }
};

// 1. 顯示編輯表單 (抓取單一使用者)
exports.showEditForm = async (req, res) => {
    const id = req.params.id; // 從網址抓取 ID
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.render('users/edit', { title: '編輯成員', user: rows[0] });
        } else {
            res.status(404).send('找不到該名使用者');
        }
    } catch (err) {
        res.status(500).send('讀取資料失敗');
    }
};

// 2. 執行更新動作
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    try {
        await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        res.redirect('/users'); // 改完後跳回清單
    } catch (err) {
        res.status(500).send('更新失敗');
    }
};

// 執行刪除動作
exports.deleteUser = async (req, res) => {
    const id = req.params.id; // 拿到那個人的 ID
    try {
        // SQL 指令：從 users 表中刪除 ID 對應的人
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        
        // 刪完後，讓頁面重整回清單頁
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('刪除失敗');
    }
};