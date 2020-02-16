const roomService = require('../services/room-service');

const roomRoutes = app => {

    app.post('/room', (req, res) => {
        roomService.queryRoom(req.body.date)
            .then(result => res.json(result))
    })
    
    app.post('/room/update-room-meeting', async (req, res) => {
        const result = await roomService.updateRoomMeetingByUser(req.body);
        res.json(result);
    });

};

module.exports = roomRoutes;