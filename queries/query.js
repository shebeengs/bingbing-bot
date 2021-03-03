const DB = require('pg').Client;

module.exports = {
    name: 'query',
    description: 'Lists users',
    execute(msg, dbConn, args){
        if (!args.length) {
            msg.react('❌');
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!. \nCorrect format: !query <query>  e.g. ` + '`!query SELECT * FROM userinfo`');
        }
        else {
            var db = new DB(dbConn);
        db.connect().then(
            () => console.log("Database connected.")
        ).then(
            () => db.query(args[0])
        ).then(
            results => {
                for (var i = 0; i < results.length; i ++){
                    msg.channel.send(`${results.rows}`);
                }
            }
        )
        }
    }
}