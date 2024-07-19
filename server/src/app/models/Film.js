const mongoose = require('mongoose');
const {Schema} = mongoose;

const Film = new Schema(
    {
        name: {type: String},

        content: {type: String},

        country: {type: String},

        releaseDay: {type: String},

        durations: {type: Number},

        status: {type: Array},

        type: {type: String},

        idTrailer: {type: String},

        avatar: {type: String},
        
        listImage: {type: Array},
        
        episode: {type: Object},

        genre: {type: Array},
        
        point: {type: Number, default: 0},

        listCmt: {type: Array, default: []},
    },
    {timestamps: true, versionKey: false},
);

module.exports = mongoose.model('Film', Film);
