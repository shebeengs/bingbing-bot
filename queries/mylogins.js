const DB = require('pg').Client;
const moment= require('moment');

module.exports = {
    name: 'mylogins',
    description: 'Shows historical logins',
    execute(msg, dbConn, args){
        if (!args.length) {
            msg.react('❌');
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!. \nCorrect format: ` + '`!mylogins <number `');
        }
        else {

        }
    }
}