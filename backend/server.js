// const dotenv = require('dotenv')
// dotenv.config()

// const app = require('./app')

// app.listen(process.env.PORT || 8081, (req, res) => {
//     console.log("Connected successfully !!")
// })

const { Server } = require('socket.io');

const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');

const http = require('http');
const server = http.createServer(app);

// Setup SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on('connection', (socket) => {
  socket.on('newUser', (username) => {
    addNewUser(username, socket.id);

    console.log(onlineUsers);
  });
  
  socket.on('sendNotification', ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(`${receiver?.socketId}`).emit('getNotification', {
      senderName,
      content: type,
    });
  });

  socket.on('sendText', ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(`${receiver?.socketId}`).emit('getText', {
      senderName,
      text,
    });
  });
  
  socket.on('logout', () => {
    removeUser(socket.id);
    console.log(onlineUsers);
  });

});

server.listen(process.env.PORT, (req, res) => {
  console.log('Connected successfully !!');
});
