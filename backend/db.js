const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost:27017/inotebook';
const connectToMongo = () => {
    mongoose.connect(dbUri).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('MongoDB connection failed! ', err)
    })
}

module.exports = connectToMongo;