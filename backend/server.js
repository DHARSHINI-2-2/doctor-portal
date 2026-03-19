const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http'); 
const { Server } = require('socket.io');

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);
// Configure Socket.io with CORS
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

// Real-Time Chat Logic
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Join a specific appointment room
    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`User Joined Room: ${room}`);
    });

    // Receive message from one user and broadcast it to the room
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on('disconnect', () => {
        console.log("User Disconnected", socket.id);
    });
});

// Middleware to parse JSON
app.use(express.json());
app.use(cors(
    {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
));

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));