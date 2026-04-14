//(負責接電話)地圖，告訴 Node.js 哪個網址要找哪個主廚

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // 找主廚

// 邏輯：當網址是 / 時，執行 controller 裡的 getAllUsers
router.get('/', userController.getAllUsers);

// 網址：/users/add
router.get('/add', userController.showCreateForm);

// 網址：/users/add (POST 提交)
router.post('/add', userController.addUser);

// routes/userRoutes.js

// 顯示編輯表單 (例如網址是 /users/edit/5)
router.get('/edit/:id', userController.showEditForm);

// 處理更新動作
router.post('/update/:id', userController.updateUser);


// 刪除使用者 (通常點擊按鈕就直接執行)
router.get('/delete/:id', userController.deleteUser);

module.exports = router;