
const mongoService = require('./mongo-service');
const utility = require('../utility/date-formatter');
const ObjectId = require('mongodb').ObjectId;

const initRoom = (date) => {
    return {
        creationDate: date,
        times: [
            { fromStart: '9:00', toEnd: '10:00', isAvialable: true, occupiedBy: '' },
            { fromStart: '10:00', toEnd: '11:00', isAvialable: true, occupiedBy: '' },
            { fromStart: '11:00', toEnd: '12:00', isAvialable: true, occupiedBy: '' },
            { fromStart: '12:00', toEnd: '13:00', isAvialable: true, occupiedBy: '' },
            { fromStart: '13:00', toEnd: '14:00', isAvialable: true, occupiedBy: '' },
            { fromStart: '14:00', toEnd: '15:00', isAvialable: true, occupiedBy: '' },
            { fromStart: '15:00', toEnd: '16:00', isAvialable: true, occupiedBy: '' },
            { fromStart: '16:00', toEnd: '17:00', isAvialable: true, occupiedBy: '' },
            { fromStart: '17:00', toEnd: '18:00', isAvialable: true, occupiedBy: '' },
        ]
    }
};

const checkIfDayIsAfter6Pm = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    return Date.parse(new Date()) >= Date.parse(new Date(year, month, day, 18, 00));
};

const queryRoom = (date) => {
    console.log(date)
    return mongoService.connect()
        .then(db => {
            return db.collection('room').findOne({ creationDate: date })
                .then(result => {
                    if (result) {
                        return result;
                    } else {
                        return db.collection('room').insertOne(initRoom(date))
                            .then((result) => {
                                return result.ops[0] // Return the new room that isnerted
                            })

                    }
                })
        })
};

const updateRoomMeetingByUser = (roomVal) => {
    roomVal.id = ObjectId(roomVal.id);
    return mongoService.connect()
        .then(db => {
            return db.collection('room').findOneAndUpdate(
                { _id: roomVal.id, 'times.fromStart': roomVal.fromStart, 'times.toEnd': roomVal.toEnd },
                { $set: { 'times.$.occupiedBy': roomVal.occupiedBy, "times.$.isAvialable": roomVal.isAvialable } },
                { returnOriginal: false }
            )
        }).then(result => result)
};


module.exports = {
    queryRoom,
    updateRoomMeetingByUser
}