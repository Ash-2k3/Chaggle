const express = require('express');
const http = require('http'); // Using an http server is a common practise to manage real time communication with WebSocket.
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app); // Passed the express instance to the http server instance. Express application is then configured to use this server instance. This ensures that server handles both HTTP requests(handled by Express) and WebSocket Communication.
const io = socketIo(server); // Integrating socket.io with the server

io.on('connection', (socket) => {
           console.log('A user has Connected');

           socket.on('disconnect', () => {
                      console.log('User disconnected');
           });

           socket.on('start-chat', (data) => {
                      console.log(`User ${socket.id} started a chat`);
                      io.emit('start-chat');
           });

           socket.on('end-call', () => {
                      console.log(`User ${socket.id} ended the video call`)
           });

           socket.on('skip-call', (data) => {
                      console.log(`User ${socket.id} skipped the video call`)
           });
});

app.use(express.static(path.join(__dirname, '../chaggle-frontend/dist/chaggle-frontend')));

const port = process.env.port || 4000;

server.listen(port, () => {
           console.log(`App is running on port ${port}`);
});

app.get('*', (req, res) => {
           res.sendFile(path.join(__dirname, '../chaggle-frontend/dist/chaggle-frontend/index.html'));
});