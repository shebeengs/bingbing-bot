const DB = require('pg').Client;
const moment= require('moment');

module.exports = {
    name: 'login',
    description: 'User login',
    execute(msg, dbConn){
        const db = new DB(dbConn);
        var discordId = msg.author.id;
        const type = 'in';
        async function logIn () { 
            try {
                await db.connect();
                console.log("Database connected.");
            } catch (error) {
                console.error(error);
                msg.reply("Failed to connect to Botbotbot database. Try again.");
            } try {
                let results = await db.query('SELECT * FROM userlogs WHERE discord_id = ($1) ORDER BY id DESC LIMIT 1',[discordId]);
                let dbData = results.rows;
                if (results.rowCount === 0) {
                    await db.query('INSERT INTO userlogs (discord_id, logtime, type) VALUES (($1),NOW(),($2))', [discordId,type]);
                    msg.channel.send(`Name: ${msg.author}` + '\nLogin timestamp: '+ '`'+ moment().format("dddd, MMMM DD, YYYY [at] kk:mm:ss") +'`');
                    console.log("First login - user added.");
                }
                else if (dbData[0].type === 'out'){
                    await db.query('INSERT INTO userlogs (discord_id, logtime, type) VALUES (($1),NOW(),($2))', [discordId,type]);
                    msg.channel.send(`Name: ${msg.author}` + '\nLogin timestamp: '+ '`'+ moment().format("dddd, MMMM DD, YYYY [at] kk:mm:ss") +'`');
                }
                else {
                    msg.react('❌');
                    msg.reply("You have already logged in `" + moment(dbData[0].logtime).calendar() + "`");
                }
            } catch (error) {
                console.error(error);
                msg.reply("Something went wrong. Try again.");
            } finally {
                await db.end();
                console.log("Database disconnected.");
            }
        }
        logIn();
    }
}