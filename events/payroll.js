const moment = require('moment');
const Discord = require('discord.js');

module.exports = {
    name: 'payroll',
    description: 'Remind everyone every payday: 15th and end of month.',
    execute(bot,myChannel,servethCh){
        setInterval(function () {
            var dateToday = new Date();
            var nextMonth = new Date(new Date(dateToday).setMonth(dateToday.getMonth()));
            var every15 = (dateToday.getDate() === 15) && (dateToday.getHours() === 2) && (dateToday.getMinutes() === 00) && (dateToday.getSeconds() === 00);
            
            var everyEOM = result && (dateToday.getHours() === 2) && (dateToday.getMinutes() === 00) && (dateToday.getSeconds() === 00);
            isLastDay(dateToday);

            if (every15 || everyEOM) {
                bot.channels.cache.get(myChannel).send("@everyone It's payday! 🎉");
                //bot.channels.cache.get(servethCh).send("@everyone It's payday! 🎉");
            }
            console.log(`${dateToday} | ${nextMonth} | ${every15} | ${everyEOM} | result: ${result}`);
            console.log(`Month: ${dateToday.getMonth()}, Date: ${dateToday.getDate()}, Hours: ${dateToday.getHours()}, ${dateToday.getMinutes()}`);
        },999);

        var result;
        function isLastDay(dateToday) {
            var test = new Date(dateToday.getTime());
            test.setDate(test.getDate() + 1);
            result = test.getDate() === 1;
            return result;
        }
    }
}
/*function isLastDay(dt) {
    var test = new Date(dt.getTime());
    test.setDate(test.getDate() + 1);
    return test.getDate() === 1;
} */