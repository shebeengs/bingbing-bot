const DB = require('pg').Client;
const moment= require('moment');

module.exports = {
    name: 'shift',
    description: 'Shows schedule of the user for the day or week',
    execute(msg, dbConn, args){
        if (!args.length) {
            msg.react('❌');
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!. \nAvailable args for` + '`!shift`: `!shift today` and `!shift week`');
        }
        else {
            if (args[0] === 'today'){
                const db = new DB(dbConn);
                const discordId = msg.author.id;
                const dayToday = new Date().getDay();
                
                //const qq = `SELECT starttime, endtime FROM schedule WHERE discord_id = ${discordId} && day = ${dayToday}`;

                db.connect().then(
                    () => console.log('Database connected.')
                ).catch(
                    err => console.log(err)
                ).then(
                    () => db.query('SELECT day, starttime, endtime FROM schedule WHERE discord_id = ($1) AND sched_id = ($2) ORDER BY id',[discordId,dayToday])
                ).then(
                    results => {
                        console.table(results.rows);
                        console.log(results.rows);
                        let dbData = results.rows;
                        
                        if (results.rowCount === 0){
                            msg.channel.send('No schedule.');
                        }
                        else if (results.rowCount === 2){
                            msg.channel.send(`${msg.author.username}'s schedule for today ` + moment().format("dddd, MMMM DD, YYYY") + ': `' + `${dbData[0].starttime} to ${dbData[1].endtime}` + '`');
                        }
                        else {
                            msg.channel.send(`${msg.author.username}'s schedule for today ` + moment().format("dddd, MMMM DD, YYYY") + ': `' + `${dbData[0].starttime} to ${dbData[0].endtime}` + '`');
                        }
                        
                        console.log(results.rowCount);
                    }
                ).catch(
                    err => console.log(err)
                ).finally(
                    () => {
                        db.end();
                        console.log("Database disconnected.");
                    }
                )
            }
            else if (args[0] === 'week') {
                const db = new DB(dbConn);
                var discordId = (msg.author.id);

                db.connect().then(
                    () => console.log("Database connected")
                ).catch(
                    err => console.log(err)
                ).then(
                    () => db.query('SELECT sched_id, day, starttime, endtime,type FROM schedule WHERE discord_id = ($1) order by id',[discordId])
                ).then(
                    results => {
                        if (results.rowCount === 5) {
                            var dbData = results.rows;
                            var displayresults = [];
                                for (var i = 0; i < dbData.length; i++) {
                                    displayresults.push(`${dbData[i].day}: ${dbData[i].starttime} to ${dbData[(i)].endtime}`);
                                }
                            console.table(results.rows);
                            console.log(results.rows);
                            console.log(results.rowCount);
                            msg.channel.send("```"+ msg.author.username + "'s Weekly Schedule \n\n" + displayresults.join("\n") + "```");
                        } else {
                            var dbData = results.rows;
                            var displayresults = [];
                                for (var i = 0; i < dbData.length; i+=2) {
                                    displayresults.push(`${dbData[i].day}: ${dbData[i].starttime} to ${dbData[i+1].endtime}`);
                                }
                            console.table(results.rows);
                            console.log(results.rows);
                            console.log(results.rowCount);
                            msg.channel.send("```"+ msg.author.username + "'s Weekly Schedule \n\n" + displayresults.join("\n") + "```");
                            //msg.channel.send('Coming soon 😛');
                        }
                    }
                ).catch(
                    err => console.log(err)
                ).finally(
                    () => {
                        db.end();
                        console.log("Database disconnected.");
                    }
                )
            }
        }
    }
}