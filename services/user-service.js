const mongoService = require('./mongo-service');
const { ObjectId } = require('mongodb');


const insertUser = (newUser) => {
    return mongoService.connect()
        .then(db => {
            return db.collection('users').findOne({ name: newUser.name })
                .then(result => {
                    console.log('user', result)
                    if (result) {
                        return false;
                    } else {
                        return db.collection('users').insertOne(newUser)
                            .then((result) => {
                                return result.ops[0] // Return the new user that isnerted
                            })
                    }
                });
        })
};

const removeUser = (user) => {
    user._id = ObjectId(user._id);
    return mongoService.connect()
        .then(db => {
            const userRemoved = db.collection('users').deleteOne({ _id: user._id }, { justOne: true });
            return userRemoved
        })
};

const login = (user) => {
    console.log(user)
    return mongoService.connect()
        .then(db => {
            const requestedUser = db.collection('users').findOne({ name: user.name });
            return requestedUser;
        })
};


module.exports = {
    insertUser,
    removeUser,
    login
};