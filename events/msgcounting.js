const DB = require('pg').Client;
const moment= require('moment');

module.exports = {
    name: 'msgcounting',
    description: 'Count msgs that are not from "Admin" role',
    execute(msgcounter,msg){
        if (!msg.member.roles.cache.some(role => role.name === 'Admin')){
            msgcounter ++;
            console.log(msgcounter,msg.author.username,new Date(), msg.url);
        }
    }
}

