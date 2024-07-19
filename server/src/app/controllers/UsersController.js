const User = require('../models/User');
const Token = require('../../utils/token');
const Film = require('../models/Film');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class UsersController {
    login(req, res) {
        const data = req.body;

        console.log('-----------------------------------');
        console.log('| [POST] users/login ');
        console.log('| Email: ', data?.email);
        console.log('| Password: ', data?.password);
        console.log('-----------------------------------');

        const email = data?.email?.toLowerCase();
        if (!email) res.status(400).json({msg: 'email field is required'});

        const password = data?.password;
        if (!password)
            res.status(400).json({msg: 'password field is required'});

        User.findOne({email: email, password: password}, (err, user) => {
            if (user !== null) {
                const token = Token.createToken(data);

                const refreshToken = Token.createRefreshToken(data);

                const customeResUser = user.toObject();

                delete customeResUser.password;
                delete customeResUser.createdAt;
                delete customeResUser.updatedAt;

                const resUser = {
                    ...customeResUser,
                    token: token,
                    refreshToken: refreshToken,
                    msg: 'Sign In Success',
                };
                res.status(200).json({
                    ...resUser,
                });
            } else {
                res.status(400).json({
                    msg: 'Email or password incorrect!!!',
                });
            }
        });
    }

    getProfile(req, res) {
        const data = req.body;

        console.log('-----------------------------------');
        console.log('| [POST] users/getprofile ');
        console.log('| ID User: ', data?.userId);
        console.log('-----------------------------------');

        if (!data.userId)
            res.status(400).json({msg: 'userId field is required'});

        User.findOne({_id: data.userId}, (err, user) => {
            if (user !== null) {
                const token = Token.createToken(data);

                const refreshToken = Token.createRefreshToken(data);

                const customeResUser = user.toObject();

                delete customeResUser.password;
                delete customeResUser.createdAt;
                delete customeResUser.updatedAt;

                const resUser = {
                    ...customeResUser,
                    token: token,
                    refreshToken: refreshToken,
                    msg: 'Get Profile Success',
                };

                res.status(200).json({
                    ...resUser,
                });
            } else {
                res.status(400).json({
                    msg: 'User id does not exist!!!',
                });
            }
        });
    }

    signUp(req, res) {
        const data = req.body;

        const email = data?.email?.toLowerCase();
        if (!email) res.status(400).json({msg: 'email field is required'});

        const password = data.password;
        if (!password)
            res.status(400).json({msg: 'password field is required'});

        const name = data.name;
        if (!name) res.status(400).json({msg: 'name field is required'});

        console.log('-----------------------------------');
        console.log('| [POST] users/signup ');
        console.log('| Email: ', email);
        console.log('| Password: ', password);
        console.log('| Name: ', name);
        console.log('-----------------------------------');

        User.findOne({email: email}, (err, user) => {
            if (user === null) {
                // nếu trong DB không có email vừa được gửi lên thì mới được tạo tài khoản
                const newUser = {
                    name: name,
                    email: email,
                    password: password,
                };

                const createUser = new User(newUser);

                createUser
                    .save()
                    .then(() => {
                        console.log(
                            '------------\nCreate User: ',
                            email,
                            '\n------------',
                        );
                        // res.status(200).json({msg: 'Tạo tài khoản thành công'})
                        User.findOne({email: email}, (err, user) => {
                            const data = {userEmail: user.email};

                            const token = Token.createToken(data);

                            const refreshToken = Token.createRefreshToken(data);

                            const customeResUser = user.toObject();

                            delete customeResUser.password;
                            delete customeResUser.createdAt;
                            delete customeResUser.updatedAt;

                            const resUser = {
                                ...customeResUser,
                                token: token,
                                refreshToken: refreshToken,
                                msg: 'Sign Up Success',
                            };
                            res.status(200).json({
                                ...resUser,
                            });
                        });
                    })
                    .catch(() => {});
            } else {
                res.status(400).json({
                    msg: 'Email đã tồn tại!!!',
                });
            }
        });
    }

    like(req, res) {
        const idUser = req.body.idUser;
        const idFilm = req.body.idFilm;

        console.log('-----------------------------------');
        console.log('| Data nhận ');
        console.log('| idUser: ', idUser);
        console.log('| idFilm: ', idFilm);

        User.findOne({_id: idUser}, (err, user) => {
            Film.findOne({_id: idFilm}, (err, film) => {
                if (user !== null) {
                    console.log('| User tồn tại');

                    let newListLikes = [...user.listLike];

                    let newPoint = film.point;

                    if (user.listLike?.some(value => value === idFilm)) {
                        console.log('| unLike');
                        console.log('| Point -1');

                        newPoint -= 1;

                        newListLikes = user.listLike.filter(
                            value => value !== idFilm,
                        );
                    } else {
                        console.log('| Like');
                        console.log('| Point +1');

                        newPoint += 1;

                        newListLikes.push(idFilm);
                    }

                    Film.updateOne({_id: idFilm}, {point: newPoint}).then(
                        () => {
                            console.log(`| Update point Done`);
                            User.updateOne(
                                {_id: idUser},
                                {listLike: newListLikes},
                            ).then(() => {
                                res.status(200).json({
                                    msg: 'Yêu thích thành công!!!',
                                });

                                console.log(`| Done`);

                                console.log(
                                    '-----------------------------------',
                                );
                            });
                        },
                    );
                } else {
                    console.log('| User không tồn tại');

                    console.log('-----------------------------------');
                    res.status(400).json({
                        msg: 'Error!!!',
                    });
                }
            });
        });
    }
    removelistLike(req, res) {
        const idUser = req.body.idUser;
        const select = req.body.select;

        console.log('-----------------------------------');
        console.log('| Data nhận ');
        console.log('| idUser: ', idUser);
        console.log('| select: ', select);

        User.findOne({_id: idUser}, async (err, user) => {
            if (user !== null) {
                console.log('| User tồn tại');
                let count = 0;

                let newListLikes = [...user.listLike];

                newListLikes = newListLikes.filter(element => {
                    return select.indexOf(element) === -1;
                });

                await select.forEach(async idFilm => {
                    Film.findOne({_id: idFilm}, (err, film) => {
                        let newPoint = film.point;

                        newPoint -= 1;

                        Film.updateOne({_id: idFilm}, {point: newPoint}).then(
                            () => {
                                console.log(`| Update point Done`);
                                count++;

                                if (count === select?.length) {
                                    User.updateOne(
                                        {_id: idUser},
                                        {listLike: newListLikes},
                                    ).then(() => {
                                        res.status(200).json({
                                            msg: 'Xoá film thành công!!!',
                                        });
                                        console.log('count', count);
                                        console.log(`| Done`);
                                        console.log(
                                            '-----------------------------------',
                                        );
                                    });
                                }
                            },
                        );
                    });
                });
            } else {
                console.log('| User không tồn tại');

                console.log('-----------------------------------');
                return res.status(400).json({
                    msg: 'Error!!!',
                });
            }
        });
    }
    removefilmfromlist(req, res) {
        const idUser = req.body.idUser;
        const select = req.body.select;
        const idList = req.body.idList;

        console.log('-----------------------------------');
        console.log('| Data nhận ');
        console.log('| idUser: ', idUser);
        console.log('| select: ', select);
        console.log('| idList: ', idList);

        User.findOne({_id: idUser}, (err, user) => {
            if (user !== null) {
                console.log('| User tồn tại');
                let newListPlays = [...user.listPlay];

                newListPlays.forEach(list => {
                    if (list._id === idList) {
                        list.data = list.data.filter(element => {
                            return select.indexOf(element) === -1;
                        });
                    }
                });

                User.updateOne({_id: idUser}, {listPlay: newListPlays}).then(
                    () => {
                        res.status(200).json({
                            msg: 'Xoá film thành công!!!',
                        });
                        console.log(`| Done`);
                        console.log('-----------------------------------');
                    },
                );
            } else {
                console.log('| User không tồn tại');

                console.log('-----------------------------------');
                return res.status(400).json({
                    msg: 'Error!!!',
                });
            }
        });
    }

    addtolist(req, res) {
        const idUser = req.body.idUser;
        const idFilm = req.body.idFilm;
        const listUpdate = req.body.listUpdate;

        console.log('-----------------------------------');
        console.log('| [POST] /user/addtolist ');
        console.log('| idUser: ', idUser);
        console.log('| idFilm: ', idFilm);
        console.log('| listUpdate: ', listUpdate);

        User.findOne({_id: idUser}, (err, user) => {
            if (user !== null) {
                console.log('| User tồn tại');
                User.updateOne({_id: idUser}, {listPlay: listUpdate}).then(
                    () => {
                        res.status(200).json({
                            msg: 'Thêm vào list thành công!!!',
                        });
                        console.log(`| Done`);
                        console.log('-----------------------------------');
                    },
                );
            } else {
                console.log('| User không tồn tại');

                console.log('-----------------------------------');
                res.status(400).json({
                    msg: 'Error!!!',
                });
            }
        });
    }
    createList(req, res) {
        const idUser = req.body.idUser;
        const title = req.body.title;

        console.log('-----------------------------------');
        console.log('| [POST] /users/createList');
        console.log('| idUser: ', idUser);
        console.log('| title: ', title);
        console.log('-----------------------------------');

        User.findOne({_id: idUser}, (err, user) => {
            if (user !== null) {
                console.log('| User tồn tại');

                let newlListPlay = [...user.listPlay];

                const newList = {
                    _id: mongoose.Types.ObjectId(),
                    title: title,
                    data: [],
                };
                newlListPlay.push(newList);

                User.updateOne({_id: idUser}, {listPlay: newlListPlay}).then(
                    () => {
                        res.status(200).json({
                            msg: 'Tạo list thành công!!!',
                        });

                        console.log(`| Done`);

                        console.log('-----------------------------------');
                    },
                );
            } else {
                console.log('| User không tồn tại');

                console.log('-----------------------------------');
                res.status(400).json({
                    msg: 'Error!!!',
                });
            }
        });
    }
    removelist(req, res) {
        const idUser = req.body.idUser;
        const select = req.body.select;

        console.log('-----------------------------------');
        console.log('| [POST] /users/removelist');
        console.log('| idUser: ', idUser);
        console.log('| select: ', select);
        console.log('-----------------------------------');

        User.findOne({_id: idUser}, (err, user) => {
            if (user !== null) {
                console.log('| User tồn tại');

                let newlListPlay = [...user.listPlay];

                newlListPlay = newlListPlay.filter(element => {
                    return select.indexOf(element._id.toString()) === -1;
                });

                User.updateOne({_id: idUser}, {listPlay: newlListPlay}).then(
                    () => {
                        res.status(200).json({
                            msg: 'Xoá list thành công!!!',
                        });

                        console.log(`| Done`);

                        console.log('-----------------------------------');
                    },
                );
            } else {
                console.log('| User không tồn tại');

                console.log('-----------------------------------');
                res.status(400).json({
                    msg: 'Error!!!',
                });
            }
        });
    }
    getdatalist(req, res) {
        const idUser = req.body.idUser;
        const idList = req.body.idList;

        console.log('-----------------------------------');
        console.log('| [POST] /users/removelist');
        console.log('| idUser: ', idUser);
        console.log('| idList: ', idList);
        console.log('-----------------------------------');

        User.findOne({_id: idUser}, (err, user) => {
            if (user !== null) {
                console.log('| User tồn tại');

                let newlListPlay = [...user.listPlay];

                newlListPlay = newlListPlay.find(element => {
                    return element._id.toString() === idList;
                });

                res.status(200).json(newlListPlay);

                console.log(`| Done`);

                console.log('-----------------------------------');
            } else {
                console.log('| User không tồn tại');

                console.log('-----------------------------------');
                res.status(400).json({
                    msg: 'Error!!!',
                });
            }
        });
    }
    recordhistory(req, res) {
        const idUser = req.body.idUser;
        const idFilm = req.body.idFilm;
        const currentTime = req.body.currentTime;
        const currentEpisode = req.body.currentEpisode;

        console.log('-----------------------------------');
        console.log('| [POST] /users/recordhistory');
        console.log('| idUser: ', idUser);
        console.log('| idFilm: ', idFilm);
        console.log('| currentTime: ', currentTime);
        console.log('| currentEpisode: ', currentEpisode);
        console.log('-----------------------------------');

        User.findOne({_id: idUser}, (err, user) => {
            if (user !== null) {
                console.log('| User tồn tại');

                let newListHistory = [...user.listHistory];

                newListHistory = newListHistory.filter(
                    e => e.idFilm !== idFilm,
                );

                newListHistory.unshift({
                    idFilm: idFilm,
                    currentTime: currentTime,
                    currentEpisode: currentEpisode,
                });

                User.updateOne(
                    {_id: idUser},
                    {listHistory: newListHistory},
                ).then(() => {
                    res.status(200).json({
                        msg: 'Cập nhật lịch sử thành công!!!',
                    });

                    console.log(`| Done`);

                    console.log('-----------------------------------');
                });

                console.log(`| Done`);

                console.log('-----------------------------------');
            } else {
                console.log('| User không tồn tại');

                console.log('-----------------------------------');
                res.status(400).json({
                    msg: 'Error!!!',
                });
            }
        });
    }
    update(req, res) {
        const idUser = req.body.idUser;
        const name = req.body.name;
        const email = req.body.email.toLowerCase();

        console.log('-----------------------------------');
        console.log('| [POST] /users/recordhistory');
        console.log('| idUser: ', idUser);
        console.log('| name: ', name);
        console.log('| email: ', email);
        console.log('-----------------------------------');

        User.findOne({_id: idUser}, (err, user) => {
            if (user !== null) {
                console.log('| User tồn tại');

                User.updateOne({_id: idUser}, {name: name, email: email}).then(
                    () => {
                        res.status(200).json({
                            msg: 'Cập nhật user thành công!!!',
                        });

                        console.log(`| Done`);

                        console.log('-----------------------------------');
                    },
                );

                console.log(`| Done`);

                console.log('-----------------------------------');
            } else {
                console.log('| User không tồn tại');

                console.log('-----------------------------------');
                res.status(400).json({
                    msg: 'Error!!!',
                });
            }
        });
    }
    refreshToken(req, res) {
        const refreshToken = req?.body?.refreshToken;

        console.log('-----------------------------------');
        console.log('| [POST] /users/refreshToken');
        console.log('| refreshToken: ', refreshToken);
        console.log('-----------------------------------');
        if (!refreshToken) {
            res.status(400).json({msg: 'refreshToken field is required'});
        }

        jwt.verify(
            refreshToken,
            process.env.ACCESS_REFRESH_TOKEN_SECRET,
            err => {
                if (err) return res.status(401).send({msg: 'Unauthorized'});

                const token = Token.createToken({refreshToken: refreshToken});

                const refreshTokenNew = Token.createRefreshToken({
                    refreshToken: refreshToken,
                });

                const resUser = {
                    token: token,
                    refreshToken: refreshTokenNew,
                    msg: 'Refresh Token Success',
                };

                res.status(200).json(resUser);
            },
        );
    }
}

module.exports = new UsersController();
