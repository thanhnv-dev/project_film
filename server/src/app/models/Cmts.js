const mongoose = require('mongoose');
const {Schema} = mongoose;

const Cmts = new Schema(
    {
        idFilm: {type: String},
        idUser: {type: String},
        nameUser: {type: String},
        content: {type: String},
        rating: {type: Number},
    },
    {timestamps: true, versionKey: false},
);

module.exports = mongoose.model('Cmts', Cmts);
