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
        socket.emit("authChecked", userData);

        if(typeof userData.name !== "number"){
            socket.realID = userData.id;
            socket.join("messenger");
        }

    })

    socket.on("getUsersStatus", async () =>{
        let clients = await io.in("messenger").fetchSockets()
        clients = clients.map(client => client.realID);

        const users = await controllers.getUsers()
        users.map(user => {
            user.online = clients.indexOf(user.id) !== -1;
            return user;
        })

        io.sockets.emit("usersFetched", users);
    })

    socket.on("forceDisconnect", async () => {
        socket.disconnect();


        let clients = await io.in("messenger").fetchSockets()
        clients = clients.map(client => client.realID);

        const users = await controllers.getUsers()
        users.map(user => {
            user.online = clients.indexOf(user.id) !== -1;
            return user;
        })

        io.sockets.emit("usersFetched", users);
    })
})

httpsServer.listen(() => console.log("Server listenning on PORT " + PORT));
