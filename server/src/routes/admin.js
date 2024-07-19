const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');
const token = require('../utils/token');

router.get('/', adminController.Films);
router.post('/login', adminController.login);
router.post('/deleteuser', token.authenToken, adminController.deleteuser);
router.get('/userdata', token.authenToken, adminController.userdata);
router.post('/getdatauser', token.authenToken, adminController.getProfile);
router.post('/updateuser', token.authenToken, adminController.updateuser);

module.exports = router;
