const DB = require('pg').Client;
const moment= require('moment');

module.exports = {
    name: 'mylogins',
    description: 'Shows historical logins',
    execute(msg, dbConn, args){
        let items = args[0] * 2;
        const db = new DB(dbConn);
        const discordId = msg.author.id;
        
        async function history () {
            try {
                await db.connect();
                console.log("Database connected.");
            } catch (error) {
                console.error(error);
                msg.reply("Failed to connect to Botbotbot database. Try again.");
            } try {
                let results = await db.query('SELECT * FROM userlogs WHERE discord_id = ($1) ORDER BY id DESC LIMIT ($2)',[discordId,items]);
                let dbData = results.rows;

                if (results.rowCount === 0) {
                    msg.reply("No logins found.");
                    console.log("No logins found.");
                }
                else if (results.rowCount === 1) {
                    msg.channel.send("```       Date        |    Login    |   Logout    |  Duration  \n-------------------------------------------------------------\n" + `  ${moment(dbData[0].logtime).format("ddd MMM DD, YYYY")} | ${moment(dbData[0].logtime).format("hh:mm:ss a")} |     --      |    --    \n` + "```");
                }
                else if ((dbData[0].type === 'in') && (results.rowCount > 1)) {
                    console.table(dbData);
                    let displayresults = [];
                    
                    for (var i = 1; i < dbData.length; i+=2) {
                        var timeDiff = new Date(dbData[i].logtime).getTime() - new Date(dbData[i+1].logtime).getTime();
                        var seconds = moment.duration(timeDiff).seconds();
                        var minutes = moment.duration(timeDiff).minutes();
                        var hours = Math.trunc(moment.duration(timeDiff).asHours());
                        displayresults.push(`  ${moment(dbData[i+1].logtime).format("ddd MMM DD, YYYY")} | ${moment(dbData[i+1].logtime).format("hh:mm:ss a")} | ${moment(dbData[i].logtime).format("hh:mm:ss a")} | ${hours}h ${minutes}m ${seconds}s `);
                    }
                    msg.channel.send("```       Date        |    Login    |   Logout    |  Duration  \n-------------------------------------------------------------\n" + `  ${moment(dbData[0].logtime).format("ddd MMM DD, YYYY")} | ${moment(dbData[0].logtime).format("hh:mm:ss a")} |     --      |    --    \n` + displayresults.join("\n") + "```");
                    console.log("       Date        |    Login    |   Logout    |  Duration  \n-------------------------------------------------------------\n" + `  ${moment(dbData[0].logtime).format("ddd MMM DD, YYYY")} | ${moment(dbData[0].logtime).format("hh:mm:ss a")} |     --      |    --    \n` + displayresults.join("\n"));
                }
                else if ((dbData[0].type === 'out') && (results.rowCount > 1)) {
                    console.table(dbData);
                    let displayresults = [];
                    for (var i = 0; i < dbData.length; i+=2) {
                        var timeDiff = new Date(dbData[i].logtime).getTime() - new Date(dbData[i+1].logtime).getTime();
                        var seconds = moment.duration(timeDiff).seconds();
                        var minutes = moment.duration(timeDiff).minutes();
                        var hours = Math.trunc(moment.duration(timeDiff).asHours());
                        displayresults.push(`  ${moment(dbData[i+1].logtime).format("ddd MMM DD, YYYY")} | ${moment(dbData[i+1].logtime).format("hh:mm:ss a")} | ${moment(dbData[i].logtime).format("hh:mm:ss a")} | ${hours}h ${minutes}m ${seconds}s  `);
                    }
                    msg.channel.send("```       Date        |    Login    |   Logout    |  Duration  \n-------------------------------------------------------------\n" + displayresults.join("\n") + "```");
                    console.log("       Date        |    Login    |   Logout    |  Duration  \n-------------------------------------------------------------\n" + displayresults.join("\n"));
                }
            } catch (error) {
                console.error(error);
                msg.reply("Something went wrong. Try again.");
            } finally {
                await db.end();
                console.log("Database disconnected.");
            }
        }

        if (!args.length) {
            msg.react('❌');
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!. \nCorrect format: ` + '`!mylogins <# of days>`');
        }
        else {
            history();
        }
    }
}