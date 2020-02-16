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

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('./build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
};

app.listen(PORT, () => console.log(`App is listing to port ${PORT}`));
