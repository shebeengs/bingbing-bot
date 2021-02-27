const moment = require('moment');
const Discord = require('discord.js');


module.exports = {
    name: 'payroll',
    description: 'Remind Micah to pay us every 15 and end of month.',
    execute(bot,myChannel,servethCh){
        setInterval(function () {
            var dateToday = new Date();
            var nextMonth = new Date(new Date(dateToday).setMonth(dateToday.getMonth()+1));
            var every15 = (dateToday.getDate() === 15) && (dateToday.getHours() === 10) && (dateToday.getMinutes() === 00) && (dateToday.getSeconds() === 00);
            var everyEOM = (nextMonth.getDate() === 0) && (dateToday.getHours() === 10) && (dateToday.getMinutes() === 00) && (dateToday.getSeconds() === 00);

            if (every15 || everyEOM) {
                bot.channels.cache.get(myChannel).send("@everyone It's payday! 🎉");
                bot.channels.cache.get(servethCh).send("@everyone It's payday! 🎉");
            }
        },999);
    }
}