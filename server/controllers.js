const db = require("./config/config");

class Post {

    async isUserSign(login, password){
        const [response] = await db.query(`SELECT * FROM accounts WHERE login = '${login}' AND password = '${password}'`);
        if(response.length){
            const {name, login, isOnline, id} = response[0];
            await db.query(`UPDATE accounts SET isOnline = '${!isOnline}'`)
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

}

module.exports = new Post();