const express = require('express');
const router = express.Router();
const testController = require('../app/controllers/TestController');
const token = require('../utils/token');

router.get('/', testController.test);

module.exports = router;