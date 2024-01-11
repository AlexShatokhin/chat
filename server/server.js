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
            sendMessages()
        }

    })

    socket.on("getUsersStatus", async () =>{
        updateOnlineUsers();
    })

    socket.on("forceDisconnect", async () => {
        socket.disconnect();
        updateOnlineUsers();
    })

    socket.on("addNewMessage", async (message) => {
        const date = `${getZero(new Date().getDate())}/${getZero(new Date().getMonth()+1)}/${new Date().getFullYear()} ${getZero(new Date().getHours())}:${getZero(new Date().getMinutes())}`;
        const user = socket.realID;

        await controllers.addMessage(message, user, date);
        sendMessages();

    })

    socket.on("sendAllMessages", async () => {
        console.log("200");
        let allMessages = await controllers.getMessages()
        allMessages = allMessages.map(message => {
                                message.isOwner = message.userID === socket.realID
                                return message;
                            });
        io.sockets.emit("getMessage", allMessages)
    })
})

httpsServer.listen(() => console.log("Server listenning on PORT " + PORT));


async function updateOnlineUsers(){
    let clients = await io.in("messenger").fetchSockets()
    clients = clients.map(client => client.realID);

    const users = await controllers.getUsers()
    users.map(user => {
        user.online = clients.indexOf(user.id) !== -1;
        return user;
    })

    io.sockets.emit("usersFetched", users);
}

async function sendMessages(){
    console.log("2000");
    let allMessages = await controllers.getMessages()

    io.sockets.emit("getMessage", allMessages)
}

function getZero(number){
    return number > 9 ? number : "0" + number; 
}