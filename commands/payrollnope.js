const moment = require('moment');
const Discord = require('discord.js');


module.exports = {
    name: 'payroll',
    description: 'Remind Micah to pay us every 15 and end of month.',
    execute(bot,myChannel,servethCh){
        setInterval(function () {
            var dateToday = new Date();
            
            var every15 = new Date();
            every15.setDate(15);
            every15.setHours(10);
            every15.setMinutes(30);
            every15.setSeconds(0);
            //every15.setMilliseconds(0);
    
            var everyEOM = new Date();
            everyEOM.setMonth(everyEOM.getMonth()+1);
            everyEOM.setDate(0);
            everyEOM.setHours(10);
            everyEOM.setMinutes(0);
            everyEOM.setSeconds(0);
            //everyEOM.setMilliseconds(0);

            
            //if ((dateToday === every15) || (dateToday === everyEOM)) {
            if (dateToday === every15) {
                bot.channels.cache.get(myChannel).send("`<@301186049323958275>` It's payday! 🎉");
                //bot.channels.cache.get(servethCh).send("`<@301186049323958275>` It's payday! TEST 🎉");
            }

            //console.log(`${every15}  ||  ${dateToday}`);
            console.log(every15);
            console.log(dateToday);
            console.log(every15 === dateToday);
            console.log("===============")
        },1000);
    }
}