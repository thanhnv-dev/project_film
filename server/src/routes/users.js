const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');
const token = require('../utils/token');

router.post('/login', usersController.login);
router.post('/signup', usersController.signUp);
router.post('/getdata', token.authenToken, usersController.getProfile);
router.post('/like', token.authenToken, usersController.like);
router.post('/addtolist', token.authenToken, usersController.addtolist);
router.post('/createlist', token.authenToken, usersController.createList);
router.post('/removelist', token.authenToken, usersController.removelist);
router.post('/getdatalist', token.authenToken, usersController.getdatalist);
router.post(
    '/removelistLike',
    token.authenToken,
    usersController.removelistLike,
);
router.post(
    '/removefilmfromlist',
    token.authenToken,
    usersController.removefilmfromlist,
);
router.post('/recordhistory', token.authenToken, usersController.recordhistory);
router.post('/update', token.authenToken, usersController.update);
router.post('/refreshtoken', usersController.refreshToken);

module.exports = router;
