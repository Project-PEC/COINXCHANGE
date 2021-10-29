const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});
let users = []
const addUser = (userId, socketId, userImage) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId, userImage });
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}
const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}
io.on("connection", (socket) => {
    console.log("a user connected.");
    // io.emit("Welcome","Hello this is socket server");
    socket.on("addUser", (userId, userImage) => {
        addUser(userId, socket.id, userImage);
        io.emit("getUsers", users);
    })

    //send
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
            receiverId
        })
    })
    socket.on('forceDisconnect', function () {
        socket.disconnect();
    });
    //when disconnect
    socket.on('disconnect', () => {
        console.log("A user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})
