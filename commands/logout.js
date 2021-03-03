const moment= require('moment');

module.exports = {
    name: 'logout',
    description: 'Allows user to logout and return number of hours worked.',
    execute(msg, loginTime){
        if (loginTime[msg.author.id] !== undefined) {
            logoutTime = new Date();
            var timeDiff = logoutTime.getTime() - loginTime[msg.author.id].getTime();
            var seconds = moment.duration(timeDiff).seconds();
            var minutes = moment.duration(timeDiff).minutes();
            var hours = Math.trunc(moment.duration(timeDiff).asHours());

            msg.channel.send(`Name: ${msg.author}` + '\nLogout timestamp: ' + '`' + moment(logoutTime[msg.author.id]).format("dddd, MMMM DD, YYYY [at] kk:mm:ss") + '` \nShift duration: `' + `${hours}h ${minutes}m ${seconds}s`+ '`');
            delete loginTime[msg.author.id];
        }
        else {
            msg.react('❌');
            msg.reply(`You're not logged in. Please log in first.`);
        }
            console.log(loginTime);
            console.log("timeDiff = " + timeDiff);
    }
}