const userService = require('../services/user-service');

const userRoutes = app => {

    app.post('/user/insert', async (req, res) => {
        const newUser = req.body;
        const result = await userService.insertUser(newUser);
        res.json(result);
    });

    app.post('/user/remove', async (req, res) => {
        const user = req.body;
        const result = await userService.removeUser(user);
        res.json(result);
    });

    app.post('/login', async (req, res) => {
        const user = req.body;
        const requestedUser = await userService.login(user);
        res.json(requestedUser);
    });
};

module.exports = userRoutes;