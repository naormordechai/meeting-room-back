const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user-route');
const roomRoutes = require('./routes/room-route');

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true // enable set cookie
}));

app.use(bodyParser.json());

userRoutes(app);
roomRoutes(app);

app.listen(PORT, () => console.log(`App is listing to port ${PORT}`));
