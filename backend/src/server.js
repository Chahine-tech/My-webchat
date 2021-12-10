import { Server } from "socket.io";
let users = []
const io = new Server({
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    socket.emit('ASK_NICKNAME')
    socket.emit("hello", "world")
    // socket.on('SEND_NICKNAME', function (nickname) {
    //     console.log(nickname)
    //     users.push({ nickname, socketId: socket.id });
    //     console.log(users);
    // })
    console.log("new connection :", socket.id);

    socket.on("room::join", ({ room }) => {
        socket.join(room);
        console.log("room joined:", room)
    });
    // socket.on("disconnect", () => {
    //     users = users.filter(({ socketId }) => socketId !== socket.id)
    //     console.log('current users:', users);
    // });
    socket.on("room::message::send", ({ room, message, time }) => {
        console.log("Message received", message, room, time)
        if (room && message) {
            io.to(room).emit("room::message::send", { room, message, time });
        }
        else {
            console.log("Error no room or message")
        }

    });
    socket.emit('ASK_PASSWORD')
    socket.on("private::message", (anotherSocketId, message, password) => {
        if (password) {
            socket.join(privateRoom)
            console.log("Welcome to private room", anotherSocketId, message)
        }
        else{
            console.log("password incorrect")
        }

    })
})

io.listen(3001);
console.log("server started at localhost:3001");