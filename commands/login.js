const moment= require('moment');

module.exports = {
    name: 'login',
    description: 'Allows user to login',
    execute(msg, loginTime){
        if (loginTime[msg.author.id] !== undefined){
            msg.react('❌');
            msg.reply("You have already logged in `" + moment(loginTime[msg.author.id]).calendar() + "`. Please log out first.");
        }
        else {
            loginTime[msg.author.id] = new Date();
            msg.channel.send(`Name: ${msg.author}` + '\nLogin timestamp: '+ '`'+ moment(loginTime[msg.author.id]).format("dddd, MMMM DD, YYYY [at] kk:mm:ss") +'`');
        }
        console.log(loginTime);
        //console.log(loginTime[msg.author.id].getTime());    
        }
}
