// src/socket.js
import { io } from 'socket.io-client';

const URL = 'http://localhost:3000'; // Replace 'your-port' with the actual port your server is running on
const socket = io(URL, {
    autoConnect: false,
});

export default socket;
