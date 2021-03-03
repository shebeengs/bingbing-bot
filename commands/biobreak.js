const moment= require('moment');

module.exports = {
    name: 'biobreak',
    description: 'Allows user to set a timer',
    execute(msg, setTimer, breakLength){
        if (setTimer[msg.author.id] === undefined){
            setTimer[msg.author.id] = new Date();
            msg.channel.send(`${breakLength}-min timer started.`);
            
            setTimeout(function comeBack () {
                if (setTimer[msg.author.id] === undefined) {
                    console.log(setTimer);
                }
                else {
                    msg.reply('Come back!');
                    //delete breakTime[msg.author.id];
                    console.log(setTimer);
                }
            }, breakLength*60*1000);
            console.log(setTimer, breakLength);
        }
        else {
            msg.react('❌');
            msg.reply("You're already on a break. Started: `" + moment(setTimer[msg.author.id]).calendar() + '` \nType `!back` to set another timer.');
            console.log(setTimer);
        }
    }
}