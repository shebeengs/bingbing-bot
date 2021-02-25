const moment= require('moment');

module.exports = {
    name: 'timer',
    description: 'Allows user to set a timer',
    execute(msg, args, setTimer){
        if (!args.length) {
            msg.react('❌');
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!. \nCorrect format: !timer <number of minutes>  e.g. ` + '`!timer 15`');
        }
        else {
            if (setTimer[msg.author.id] === undefined){
                setTimer[msg.author.id] = new Date();
                msg.channel.send(`${args[0]}-min timer started.`);
            
                setTimeout(function comeBack () {
                    if (setTimer[msg.author.id] === undefined) {
                        console.log(setTimer);
                    }
                    else {
                        msg.reply('Come back!');
                        //delete breakTime[msg.author.id];
                    console.log(setTimer);
                  }
                }, args[0]*60*1000);
            }
            else {
                msg.react('❌');
                msg.reply("You're already on a break. Started: `" + moment().calendar(setTimer[msg.author.id]) + '`');
            }
            console.log(setTimer);
        }
    }
}
