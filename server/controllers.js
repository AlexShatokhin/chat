const db = require("./config/config");

class Post {

    async isUserSign(login, password){
        const [response] = await db.query(`SELECT * FROM accounts WHERE login = '${login}' AND password = '${password}'`);
        if(response.length){
            const {name, login, id} = response[0];
            return {id, name, login}
        } else {
            return {
                id: -1,
                name: -1,
                login: -1
            }
        }
    }

    async getUsers(){
        const [response] = await db.query(`SELECT * FROM accounts`);
        return response;
    }

    async addMessage(message, user, time){
        await db.query(`
            INSERT INTO messages(messageContent, userID, sendTime)
            VALUES('${message}', '${user}', '${time}')
        `)
    }

    async getMessages(){
        const [response] = await db.query(`
            SELECT messages.*, name, login FROM messages
            LEFT JOIN accounts ON accounts.id = messages.userID;
        `);
        return response;
    }

    async createUserAccount(name, login, password){
        const [response] = await db.query(`SELECT * FROM accounts WHERE login = '${login}' OR name = '${password}'`);
        if(response.length)
            return {
                status: 300,
                message: "Пользователь с таким именем/логином уже существует"
            }
        else{
            await db.query(`
                INSERT INTO accounts(name, login, password)
                VALUES('${name}', '${login}', '${password}')`);
            
            return {
                status: 200,
                message: "Пользователь успешно зарегистрирован!"
            }
        }
    }

}

module.exports = new Post();