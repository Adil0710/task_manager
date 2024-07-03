// Load env variables
import { config } from "dotenv";
if(process.env.NODE_ENV !== 'production'){
    config()
}
import express from 'express';
import cors from 'cors'
import http from 'http'; // Import the HTTP module
import { Server as SocketIOServer } from 'socket.io'; // Import the Socket.IO Server class
import CookieParser from 'cookie-parser'
import connectToDb from "./config/connectToDb.js";

// Import your routes
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import projectRoutes from "./routes/projects.js";
import noticeRoutes from "./routes/notices.js";
import authRoutes from './routes/auth.js'


// Create an express app
const app = express();

// Create an HTTP server using the express app
const server = http.createServer(app);

// Create a Socket.IO server instance and attach it to the HTTP server
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

// Connect to the database
connectToDb();

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(CookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}))

// Example route
app.get('/', (req, res) => {
  res.json({ Hello: "World" });
});

// Mount your routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);
app.use('/notices', noticeRoutes);

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Example socket event handler
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Broadcast the message to all connected clients
        io.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the HTTP server
const PORT = process.env.PORT || 3000; // Set a default port if not provided in environment variables
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
