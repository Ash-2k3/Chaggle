const express = require('express');
const http = require('http'); // Using an http server is a common practise to manage real time communication with WebSocket.
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app); // Passed the express instance to the http server instance. Express application is then configured to use this server instance. This ensures that server handles both HTTP requests(handled by Express) and WebSocket Communication.
const io = socketIo(server); // Integrating socket.io with the server

const users = {};

io.on('connection', (socket) => {
           console.log('A user has Connected');

           users[socket.id] = { status: 'online' };

           socket.on('disconnect', () => {
                      if (users[socket.id].status === 'in-chat' && users[socket.id].chatPartner) {
                                 // Notify the other user that the chat has ended.
                                 io.to(users[socket.id].chatPartner).emit('end-call');
                                 users[socket.id].status = 'online';
                                 users[users[socket.id].chatPartner].status = 'online';
                      }
                      delete users[socket.id];
           });

           socket.on('start-chat', (data) => {
                      // Find an available user to start a chat
                      const availableUsers = Object.keys(users).filter(
                                 (userId) => users[userId].status === 'in-queue' && userId !== socket.id
                      );

                      if (availableUsers.length > 0) {
                                 console.log('Haji aap ka connection hojayega');
                                 const partnerId = availableUsers[
                                            Math.floor(Math.random() * availableUsers.length)];
                                 // Update user statuses to 'in-chat'
                                 users[socket.id].status = 'in-chat';
                                 users[partnerId].status = 'in-chat';

                                 // Store partner information.
                                 users[socket.id].chatPartner = partnerId;
                                 users[partnerId].chatPartner = socket.id;

                                 // Notify both users that the chat has started
                                 io.to(socket.id).emit('start-chat');
                                 io.to(partnerId).emit('start-chat');
                      } else {
                                 console.log('Waiting for a match');
                                 users[socket.id].status = 'in-queue';
                                 io.to(socket.id).emit('waiting-for-match');
                      }
           });

           socket.on('end-call', () => {
                      console.log(`User ${socket.id} ended the video call`);

                      // Notify the other user that the chat has ended
                      io.to(users[socket.id].chatPartner).emit('end-call');

                      // Update user statuses to 'available'
                      users[socket.id].status = 'available';
                      users[users[socket.id].chatPartner].status = 'available';
           });

           socket.on('new-message', (data) => {
                      console.log(`Recieved message ${data}`)
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