const DB = require('pg').Client;

module.exports = {
    name: 'shift',
    description: 'Shows schedule of the user for the day',
    execute(msg, dbConn){
        const db = new DB(dbConn);
        const discordId = msg.author.id;
        const dayToday = new Date().getDay();
        //const qq = `SELECT starttime, endtime FROM schedule WHERE discord_id = ${discordId} && day = ${dayToday}`;

        db.connect().then(
            () => console.log('Database connected.')
        ).catch(
            err => console.log(err)
        ).then(
            () => db.query('SELECT day, starttime, endtime FROM schedule WHERE discord_id = ' + discordId + ' AND sched_id =' + dayToday)
        ).then(
            results => {
                console.table(results.rows);
                console.log(results.rows);
                let dbData = results.rows;
                if (results.rowCount === 0){
                    msg.channel.send('No schedule.');
                }
                else if (results.rowCount === 2){
                    msg.channel.send(`${msg.author.username}'s schedule for today: ${dbData[0].starttime} to ${dbData[1].endtime}`);
                }
                else {
                    msg.channel.send(`${msg.author.username}'s schedule for today: ${dbData[0].starttime} to ${dbData[0].endtime}`);
                }
                
                console.log(results.rowCount);
            }
        ).finally(
            () => {
                db.end();
                console.log("Database disconnected.");
            }
        )
    }
}