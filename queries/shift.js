const DB = require('pg').Client;
const moment= require('moment');

module.exports = {
    name: 'shift',
    description: 'Shows schedule of the user for the day or week',
    execute(msg, dbConn, args){
        const db = new DB(dbConn);
        const discordId = msg.author.id;
        const dayToday = new Date().getDay();

        if (!args.length) {
            msg.react('❌');
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!. \nAvailable args for` + '`!shift`: `!shift today` and `!shift week`');
        }
        else if (args[0] === 'today'){
            today ();
        }
        else if (args[0] === 'week') {
            week ();            
        }

        async function today() {
            try {
                await db.connect();
                console.log('Database connected.');
            } catch (error) {
                console.error(error);
                msg.reply("Failed to connect to Botbotbot database. Try again.");
            } try {
                let results = await db.query('SELECT * FROM schedule WHERE discord_id = ($1) AND sched_id = ($2) ORDER BY id',[discordId,dayToday]);

                console.table(results.rows);
                console.log(results.rows);
                let dbData = results.rows;
                
                if (results.rowCount === 0){
                    msg.channel.send('No schedule.');
                }
                else {
                    if (results.rowCount === 2){
                        msg.channel.send(`${msg.author.username}'s schedule for today:\n` + "```       Date       | Start time | End time \n------------------------------------------\n" + ` ${moment().day(dbData[0].sched_id).format("ddd MMM DD, YYYY")} |  ${moment(dbData[0].starttime,"hh:mm:ss").format("hh:mm a")}  | ${moment(dbData[(1)].endtime, "hh:mm:ss").format("hh:mm a")} ` + '```');
                    }
                    else {
                        msg.channel.send(`${msg.author.username}'s schedule for today:\n` + "```       Date       | Start time | End time \n------------------------------------------\n" + ` ${moment().day(dbData[0].sched_id).format("ddd MMM DD, YYYY")} |  ${moment(dbData[0].starttime,"hh:mm:ss").format("hh:mm a")}  | ${moment(dbData[(0)].endtime, "hh:mm:ss").format("hh:mm a")} ` + '```');
                    }
                }
                console.log(results.rowCount);
            } catch (error) {
                console.error(error);
                msg.reply("Something went wrong. Try again.");
            } finally {
                await db.end();
                console.log("Database disconnected.");
            }
        }

        async function week () {
            try {
                await db.connect();
                console.log('Database connected.');
            } catch (error) {
                console.error(error);
                msg.reply("Failed to connect to Botbotbot database. Try again.");
            } try {
                let results = await db.query('SELECT sched_id, day, starttime, endtime,type FROM schedule WHERE discord_id = ($1) order by id',[discordId]);
                if (results.rowCount === 0){
                    msg.channel.send('No schedule.');
                }
                else {
                    if (results.rowCount === 5) {
                        var dbData = results.rows;
                        var displayresults = [];
                            for (var i = 0; i < dbData.length; i++) {
                                displayresults.push(` ${moment().day(dbData[i].sched_id).format("ddd MMM DD, YYYY")} |  ${moment(dbData[i].starttime,"hh:mm:ss").format("hh:mm a")}  | ${moment(dbData[(i)].endtime, "hh:mm:ss").format("hh:mm a")} `);
                            }
                        console.table(results.rows);
                        console.log(results.rows);
                        console.log(results.rowCount);
                        msg.channel.send(msg.author.username + "'s weekly schedule:\n" + "```       Date       | Start time | End time \n------------------------------------------\n" + displayresults.join("\n") + "```");
                    }
                    else {
                        var dbData = results.rows;
                        var displayresults = [];
                            for (var i = 0; i < dbData.length; i+=2) {
                                displayresults.push(` ${moment().day(dbData[i].sched_id).format("ddd MMM DD, YYYY")} |  ${moment(dbData[i].starttime,"hh:mm:ss").format("hh:mm a")}  | ${moment(dbData[(i+1)].endtime, "hh:mm:ss").format("hh:mm a")} `);
                            }
                        console.table(results.rows);
                        console.log(results.rows);
                        console.log(results.rowCount);
                        msg.channel.send(msg.author.username + "'s weekly schedule:\n" + "```       Date       | Start time | End time \n------------------------------------------\n" + displayresults.join("\n") + "```");
                    }
                }
                
            } catch (error) {
                console.error(error);
                msg.reply("Something went wrong. Try again.");
            } finally {
                await db.end();
                console.log("Database disconnected.");
            }
        }
        
    }
}