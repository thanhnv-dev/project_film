const express = require('express');
const router = express.Router();
const filmsController = require('../app/controllers/FilmsController');
const token = require('../utils/token');

router.get('/datawithtopic', token.authenToken, filmsController.datawithtopic);
router.get('/data', token.authenToken, filmsController.data);
router.post('/details', token.authenToken, filmsController.details);
router.post('/update', token.authenToken, filmsController.update);
router.post('/delete', token.authenToken, filmsController.delete);
router.post('/create', token.authenToken, filmsController.create);
// router.get('/create', filmsController.create);
// router.get('/:_id', filmsController.details)
// router.post('/store', filmsController.store)
// router.delete('/:_id', filmsController.delete)
// router.get('/', filmsController.Films)

module.exports = router;
