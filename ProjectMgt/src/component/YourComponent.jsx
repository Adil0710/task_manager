// src/components/YourComponent.js
import React, { useEffect, useState } from 'react';
import socket from '../socket'; // Adjust the path according to your project structure

const YourComponent = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Connect the socket
        socket.connect();

        // Listen for messages from the server
        const messageListener = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.on('message', messageListener);

        // Cleanup function to avoid duplicate event listeners
        return () => {
            socket.off('message', messageListener);
            socket.disconnect();
        };
    }, []);

    const sendMessage = (message) => {
        socket.emit('message', message);
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <button onClick={() => sendMessage('Hello, Server!')}>Send Message</button>
        </div>
    );
};

export default YourComponent;
