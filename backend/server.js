require('dotenv').config();
const express = require('express');
const {createServer} = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const errorHandler = require('./middlewares/errorMiddleware');
const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/experts', require('./routes/expertRoutes'));
app.use('/bookings', require('./routes/bookingRoutes'));
app.set('io', io);

app.use(errorHandler);

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});