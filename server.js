const express = require('express');
const http = require('http'); // Using an http server is a common practise to manage real time communication with WebSocket.
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // Passed the express instance to the http server instance. Express application is then configured to use this server instance. This ensures that server handles both HTTP requests(handled by Express) and WebSocket Communication.
const io = socketIo(server); // Integrating socket.io with the server

io.on('connection', (socket) => {
           console.log('A user has Connected');

           socket.on('disconnect', () => {
                      console.log('User disconnected');
           });
});


const port = process.env.port || 4000;

server.listen(port, () => {
           console.log(`App is running on port ${port}`);
});

app.get('/', (req, res) => {
           res.send('<h1>Hello World</h1>');
});