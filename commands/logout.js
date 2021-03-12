const DB = require('pg').Client;
const moment= require('moment');

module.exports = {
    name: 'logout',
    description: 'Allows user to logout and return number of hours worked.',
    execute(msg, dbConn){
        const db = new DB(dbConn);
        var discordId = msg.author.id;
        const type = 'out';

        async function logOut () {
            try {
                await db.connect();
                console.log("Database connected.");
            } catch (error) {
                console.error(error);
                msg.reply("Failed to connect to Botbotbot database. Try again.");
            } try {
                let results = await db.query('SELECT * FROM userlogs WHERE discord_id = ($1) ORDER BY id DESC LIMIT 1',[discordId]);
                const dbData = results.rows;
                if (results.rowCount === 0) {
                    msg.reply("No recorded logins everrr.");
                }
                else if(dbData[0].type === 'out') {
                    msg.react('❌');
                    msg.reply("You're not logged in. Type `!login` to log in. ");
                }
                else {
                    await db.query('INSERT INTO userlogs (discord_id, logtime, type) VALUES (($1),NOW(),($2))', [discordId,type]);
                    var timeDiff = new Date().getTime() - new Date(dbData[0].logtime).getTime();
                    var seconds = moment.duration(timeDiff).seconds();
                    var minutes = moment.duration(timeDiff).minutes();
                    var hours = Math.trunc(moment.duration(timeDiff).asHours());

                    msg.channel.send(`Name: ${msg.author}` + '\nLogout timestamp: ' + '`' + moment().format("dddd, MMMM DD, YYYY [at] kk:mm:ss") + '` \nShift duration: `' + `${hours}h ${minutes}m ${seconds}s`+ '`');
                }
                console.table(results.rows);
            } catch (error) {
                console.error(error);
                msg.reply("Something went wrong. Try again.")
            } finally {
                db.end();
                console.log("Database disconnected.");
            }
        }

        logOut();
    }
}

        /* oldddd 
        db.connect().then(
            console.log("Database connected.")
        ).catch(
            err => console.log(err)
        ).then(
            () => db.query('SELECT * FROM userlogs WHERE discord_id = ($1) ORDER BY id DESC LIMIT 1',[discordId])
        ).then(
            results => {
                const dbData = results.rows;
                if(dbData[0].logtime === null || dbData[0].type === 'out') {
                    msg.react('❌');
                    msg.reply("You're not logged in. Type `!login` to log in. ");
                }
                else {
                    db.query('INSERT INTO userlogs (discord_id, logtime, type) VALUES (($1),NOW(),($2))', [discordId,type]);
                    var timeDiff = new Date().getTime() - new Date(dbData[0].logtime).getTime();
                    var seconds = moment.duration(timeDiff).seconds();
                    var minutes = moment.duration(timeDiff).minutes();
                    var hours = Math.trunc(moment.duration(timeDiff).asHours());

                    msg.channel.send(`Name: ${msg.author}` + '\nLogout timestamp: ' + '`' + moment().format("dddd, MMMM DD, YYYY [at] kk:mm:ss") + '` \nShift duration: `' + `${hours}h ${minutes}m ${seconds}s`+ '`');
                }
                console.table(results.rows);
            }
        ).catch(
            err => console.log(err)
        ).finally(
            () => {
                db.end();
                console.log("Database disconnected.");
            }
        )/**/