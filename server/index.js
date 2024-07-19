const path = require('path');
const express = require('express');
require('dotenv').config();
const app = express();
const route = require('./src/routes');
const methodOverride = require('method-override');
const fs = require('fs');
const cors = require('cors');
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(cors());

// Connect DB
const db = require('./src/config/db');
db.connect();

// // BodyParser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Static files - Images
app.use(express.static(path.join(__dirname, 'src/public')));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('SERVER ON');
});

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
