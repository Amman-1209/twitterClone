const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect('mongodb+srv://badyalaman23:root@twitterclonecluster.26tb8lu.mongodb.net?retryWrites=true&w=majority&appName=TwitterCloneCluster')
        .then(() => console.log('Connected to MongoDB'))
        .catch(e => console.log('Error connecting to MongoDB', e) );
    }
}

module.exports = new Database();