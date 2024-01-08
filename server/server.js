require("dotenv").config()

const socketIO = require("socket.io")
const server = require("http")
const controllers = require("./controllers");

const PORT = process.env.PORT || 3030

const httpsServer = server.createServer()
const io = new socketIO.Server(PORT, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("New user connected!");
    socket.on("auth", async (login, password) => {
        const userData = await controllers.isUserSign(login, password);
        socket.emit("authChecked", userData)
    })
})

httpsServer.listen(() => console.log("Server listenning on PORT " + PORT));
