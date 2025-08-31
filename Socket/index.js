const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const { text } = require("stream/consumers");

require("dotenv").config({
  path: "./.env",
});

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server);

app.get("/", (req, res) => {
  res.send("Hello from socket server, how are you?");
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

// DEFINE A MESSAGE OBJECT WITH A SEEN PROPERTY
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  // WHEN CONNECT
  console.log(`a user is connected`);

  //TAKE USER ID AND SOCKETID FROM USER
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // SEND AND GET MESSAGE
  let messages = {}; // OBJECT TO TRACK MESSAGES SENT TO EACH OTHER

  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });
    const user = getUser(receiverId);

    // STORES THE MESSAGES IN THE `MESSAGES` OBJET

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    // SEND THE MESSAGE TO THE RECEIVER

    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    //UDDATE THE SEEN FLAG FOR MESSAGE

    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;

        // SEND A MESSAGE  SEEN EVENT TO THE SENDER

        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });
  // UPDATE AND GET LAST MESSAGE

  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessageId,
    });
  });

  // DISCONNECTED

  socket.on("disconnect", () => {
    console.log(`a user is disconected`);
    removeUser(socket.id);
    io.emit("getUser", users);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log(` Server is running on port ${process.env.PORT || 4000}`);
});
