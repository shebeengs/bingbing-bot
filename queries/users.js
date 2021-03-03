const DB = require('pg').Client;

module.exports = {
    name: 'users',
    description: 'Lists users',
    execute(msg, dbConn){
        var db = new DB(dbConn);
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
                for(let i = 0; i < dbData.length; i ++){
                    let obj = dbData[i];
                    var displayresults;
                    for(let key in obj){
                        //displayresults = `${key}: ${obj[key]}` + displayresults;
                        displayresults = `${obj[key]}, ` + displayresults;
                    }
                }
                msg.channel.send(displayresults);
                console.table(results.rows);
            }
        ).finally(
            () => {
                db.end();
                console.log("Database disconnected.");
            }
        )
    }
}
