const DB = require('pg').Client;
const util = require('util');

module.exports = {
    name: 'users',
    description: 'Lists users',
    execute(msg, dbConn){
        const db = new DB(dbConn);
        db.connect().then(
            () => console.log("Database connected.") 
        ).catch(
            err => console.log(err)
        ).then(
            //() => db.query(`SELECT first_name, last_name FROM userinfo WHERE discord_id = ${msg.author.id} `)
            () => db.query(`SELECT discord_name FROM userinfo`)
        ).then(
            results => {
                var dbData = results.rows;
                var displayresults = [];
                for(let i = 0; i < dbData.length; i ++){
                    let obj = dbData[i];
                    
                    for(let key in obj){
                        //displayresults = `${key}: ${obj[key]}` + displayresults;
                        displayresults.push(obj[key]);
                    };
                };
                console.table(results.rows);
                msg.channel.send(displayresults.join(', '));
            }
        ).finally(
            () => {
                db.end();
                console.log("Database disconnected.");
            }
        )
    }
}
