const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema(
    {
        name: {type: String},
        email: {type: String},
        password: {type: String},
        listLike: {type: Array, default: []},
        listPlay: {type: Array, default: []},
        listCmt: {type: Array, default: []},
        listHistory: {type: Array, default: []},
    },
    {timestamps: true, versionKey: false},
);

module.exports = mongoose.model('User', User);
