var dbConn = null;

function connectToMongo() {
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    const uri = 'mongodb+srv://naor:naor315@cluster0-fifsq.mongodb.net/test?retryWrites=true&w=majority'
    return MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', () => {
                console.log('MongoDB Disconnected!');
                dbConn = null;
            });
            dbConn = client.db('meeting-room-schedule_db');
            return dbConn;
        })
}

module.exports = {
    connect: connectToMongo
}

