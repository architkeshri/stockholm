const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  console.log("adduser function");
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  //videocall
  socket.emit("LoggedUserSocketId", socket.id);
  socket.on("callUser", (data) => {
    console.log(data.name);
    io.to(data.userToCall).emit("hey", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("acceptCall", (data) => {
    console.log(data.to);
    io.to(data.to).emit("callAccepted", data.signal);
  });
  //endvideocall
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
