const db = require("./config/config");

class Post {

    async isUserSign(login, password){
        const [response] = await db.query(`SELECT * FROM accounts WHERE login = '${login}' AND password = '${password}'`);
        if(response.length){
            const {name, login, isOnline} = response[0];
            await db.query(`UPDATE accounts SET isOnline = '${!isOnline}'`)
            return {name, login}
        } else {
            return {
                name: -1,
                login: -1
            }
        }
    }

}

module.exports = new Post();