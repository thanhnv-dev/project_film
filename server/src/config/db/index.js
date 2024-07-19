const dotenv = require('dotenv');

dotenv.config();

const mongoose = require('mongoose');

const username = encodeURIComponent(process.env.MONGODB_ACCOUNT_NAME);

const password = encodeURIComponent(process.env.MONGODB_ACCOUNT_PASSWORD);

const cluster = process.env.MONGODB_CLUSTER;

const authSource = 'retryWrites=true';

const authMechanism = 'w=majority';

const dbName = process.env.MONGODB_DB_NAME;

mongoose.set('strictQuery', true);

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?${authSource}&${authMechanism}`;

async function connect() {
    try {
        await mongoose.connect(uri);

        console.log('Connect MongoDB Cloud successfully!!!');
    } catch (error) {
        console.log('error:', error);
    }
}

module.exports = {connect};
