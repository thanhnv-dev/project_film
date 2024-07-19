const Film = require('../models/Film');
const User = require('../models/User');
const Token = require('../../utils/token');
const dotenv = require('dotenv');

dotenv.config();

class AdminController {
    data(req, res) {
        Film.find({}, function (err, film) {
            res.send(film);
        });
    }

    login(req, res) {
        const data = req.body;

        console.log('Dữ liệu login được từ app ', data);

        const email = data.email?.toLowerCase();

        const password = data.password;
        if (
            email == process.env.ADMIN_ACCOUNT_NAME &&
            password == process.env.ADMIN_ACCOUNT_PASSWORD
        ) {
            const token = Token.createToken(data);
            const resUser = {
                token: token,
                msg: 'Sign In Success',
            };
            res.header('Access-Control-Allow-Origin', '*');

            res.status(200).json({
                ...resUser,
            });
        } else {
            res.header('Access-Control-Allow-Origin', '*');

            res.status(400).json({
                msg: 'Account invalid!!!',
            });
        }
    }

    Films(req, res) {
        Film.find({})
            .then(film => {
                film = film.map(film => film.toObject());
                res.render('Films', {
                    film,
                });
            })
            .catch(err => console.log(err));
    }
    // [POST] /films/store
    // Create film web
    store(req, res) {
        // console.log(req.body)
        const film = new Film(req.body);
        film.save()
            .then(() => {
                res.redirect('/films');
            })
            .catch(() => {});
    }
    // [DELETE] /films/:_id
    deleteuser(req, res) {
        console.log('-----------------------------------');
        console.log('| [GET] /admin/deleteuser ');
        console.log('-----------------------------------');
        const data = req.body;
        User.deleteOne({_id: data.userId})
            .then(() => {
                res.status(200).json(true);
            })
            .catch(err => {});
    }
    userdata(req, res) {
        console.log('-----------------------------------');
        console.log('| [GET] /admin/userdata ');
        User.find({}, function (err, user) {
            res.status(200).send(user);
        });
        console.log('-----------------------------------');
    }
    updateuser(req, res) {
        const data = req.body.data;
        const idUser = req.body.idUser;
        console.log('-----------------------------------');
        console.log('| POST] /admin/update ');
        console.log('-----------------------------------');
        User.updateOne({_id: idUser}, data)
            .then(film => {
                res.status(200).json(film);
            })
            .catch(err => console.log(err));
    }
    getProfile(req, res) {
        const data = req.body;
        console.log('Dữ liệu login được từ app: ', data);
        User.findOne({_id: data.userId}, (err, user) => {
            if (user !== null) {
                const customeResUser = user.toObject();
                const resUser = {
                    ...customeResUser,
                    // token: token,
                    // refreshToken: refreshToken,
                    msg: 'Get Profile Success',
                };

                res.status(200).json({
                    ...resUser,
                });
            } else {
                res.status(400).json({
                    msg: 'Không tìm thấy thông tin user',
                });
            }
        });
    }
}

module.exports = new AdminController();
