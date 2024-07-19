const Cmts = require('../models/Cmts');

class CmtsController {
    // [GET] /cmts
    data(req, res) {
        const dataReq = req.query;
        const idFilm = dataReq.idFilm;

        console.log('-----------------------------------');
        console.log('| [GET] /cmts ');
        console.log('| ID Film: ', idFilm);

        Cmts.find({}, function (err, cmts) {
            const dataRes = cmts.filter(value => value.idFilm === idFilm);
            res.send(dataRes);
        });

        console.log('-----------------------------------');
    }
    // [POST] /cmts/create
    create(req, res) {
        const dataReq = req.body;
        const idFilm = dataReq.idFilm;
        const idUser = dataReq.idUser;
        console.log('-----------------------------------');
        console.log('| [POST] /cmts/create ');
        console.log('| ID User: ', idUser);
        console.log('| ID Film: ', idFilm);
        console.log('| NameUser: ', dataReq.nameUser);
        console.log('| Content: ', dataReq.content);

        const cmt = new Cmts(dataReq);
        cmt.save()
            .then(() => {
                Cmts.find({}, function (err, cmts) {
                    const dataRes = cmts.filter(
                        value => value.idFilm === idFilm,
                    );
                    res.send(dataRes);
                });
                console.log('| Create New Cmt Film Done');
                console.log('-----------------------------------');
            })
            .catch(() => {
                console.log('| Cmt Failed!!!');
                console.log('-----------------------------------');
            });
    }
    dataall(req, res) {
        console.log('-----------------------------------');
        console.log('| [GET] /cmts/dataall ');
        Cmts.find({}, function (err, cmts) {
            res.status(200).send(cmts);
        });
        console.log('-----------------------------------');
    }
    delete(req, res) {
        const id = req.body.id;
        console.log('-----------------------------------');
        console.log('| POST] /cmts/delete ');
        console.log('| ID cmts: ', id);
        console.log('-----------------------------------');
        Cmts.deleteOne({ _id: id })
            .then(() => {
                res.status(200).json(true);
            })
            .catch(err => console.log(err));
    }
}

module.exports = new CmtsController();
