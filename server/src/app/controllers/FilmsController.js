const Film = require('../models/Film');
const moment = require('moment');

class FilmsController {
    datawithtopic(req, res) {
        Film.find({}, function (err, films) {
            if (films) {
                const actionFilms = [];
                const adventureFilms = [];
                const fictionFilms = [];
                const usFilms = [];
                const jpFilms = [];
                const manyEpisodes = [];

                const newFilms = [...films]
                    .sort(function (a, b) {
                        const timeA = moment(a.updatedAt);
                        const timeB = moment(b.updatedAt);
                        return timeA.isBefore(timeB) ? 1 : -1;
                    })
                    .slice(0, 5);

                films.sort((a, b) => b.point - a.point);

                const top3 = films.slice(0, 5);

                films.forEach(film => {
                    if (film.country === 'Mỹ') {
                        usFilms.push(film);
                    }
                    if (film.country === 'Nhật Bản') {
                        jpFilms.push(film);
                    }
                    if (film.type === 'Phim bộ') {
                        manyEpisodes.push(film);
                    }
                });

                films.forEach(film => {
                    film.genre.forEach(item => {
                        switch (item) {
                            case 'Hành Động':
                                return actionFilms.push(film);
                            case 'Phiêu Lưu':
                                return adventureFilms.push(film);
                            case 'Viễn Tưởng':
                                return fictionFilms.push(film);
                        }
                    });
                });

                const resData = [
                    {topic: 'Thịnh Hành', data: top3},
                    {topic: 'Phim mới cập nhật', data: newFilms},
                    {topic: 'Hành Động', data: actionFilms},
                    {topic: 'Phiêu Lưu', data: adventureFilms},
                    {topic: 'Viễn Tưởng', data: fictionFilms},
                    {topic: 'Mỹ', data: usFilms},
                    {topic: 'Nhật Bản', data: jpFilms},
                    {topic: 'Phim Bộ', data: manyEpisodes},
                ];

                res.send(resData);
            }
        });
    }
    details(req, res) {
        const data = req.body;

        console.log('ID Film', data.idFilm);
        console.log('-----------------------------------');
        console.log('| POST] /films/details ');
        console.log('| ID Film: ', data.idFilm);
        console.log('-----------------------------------');

        Film.findOne({_id: data.idFilm})
            .then(film => {
                res.json(film);
            })
            .catch(err => console.log(err));
    }
    data(req, res) {
        console.log('-----------------------------------');
        console.log('| POST] /films/data ');
        console.log('-----------------------------------');

        Film.find({})
            .then(film => {
                res.json(film);
            })
            .catch(err => console.log(err));
    }
    update(req, res) {
        const data = req.body.data;
        const idFilm = req.body.idFilm;
        console.log('-----------------------------------');
        console.log('| POST] /films/update ');
        console.log('-----------------------------------');
        Film.updateOne({_id: idFilm}, data)
            .then(film => {
                res.status(200).json(film);
            })
            .catch(err => console.log(err));
    }
    delete(req, res) {
        const idFilm = req.body.idFilm;
        console.log('-----------------------------------');
        console.log('| POST] /films/delete ');
        console.log('| ID Films: ', idFilm);
        console.log('-----------------------------------');
        Film.deleteOne({_id: idFilm})
            .then(() => {
                res.status(200).json(true);
            })
            .catch(err => console.log(err));
    }
    create(req, res) {
        const data = req.body;
        console.log('-----------------------------------');
        console.log('| POST] /films/create ');
        console.log('-----------------------------------');
        const createFilms = new Film(data);
        createFilms.save().then(() => {
            res.status(200).json(true);
        });
    }

}

module.exports = new FilmsController();
