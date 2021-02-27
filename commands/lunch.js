const moment= require('moment');

module.exports = {
    name: 'lunch',
    description: 'Allows user to set a 60-min timer',
    execute(msg, setTimer){
        if (setTimer[msg.author.id] === undefined){
            setTimer[msg.author.id] = new Date();
            msg.channel.send(`60-min timer started.`);
            setTimeout(function () {
                if (setTimer[msg.author.id] === undefined) {
                    console.log(setTimer);
                }
                else {
                    msg.reply(`Your lunch is ending in 5 minutes.`);
                    setTimeout(function () {
                        if (setTimer[msg.author.id] === undefined) {
                            console.log(setTimer);
                        }
                        else {
                            msg.reply(`Your lunch ended.`);
                            delete setTimer[msg.author.id];
                        }
                    }, 5*60*1000);
                    console.log(setTimer);
                }
            }, 55*60*1000);
        }
        else {
            msg.react('❌');
            msg.reply("You're already on a break. Started: `" + moment().calendar(setTimer[msg.author.id]) + '` \nType `!back` first.');
        }
    }
}