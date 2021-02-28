module.exports = {
    name: 'payroll',
    description: 'Remind everyone every payday: 1st and 15th of the month.',
    execute(bot,myChannel,servethCh){
        setInterval(function () {
            var dateToday = new Date();
            var every15 = (dateToday.getDate() === 15) && (dateToday.getHours() === 10) && (dateToday.getMinutes() === 00) && (dateToday.getSeconds() === 00);
            var everyEOM = (dateToday.getDate() === 1) && (dateToday.getHours() === 10) && (dateToday.getMinutes() === 00) && (dateToday.getSeconds() === 00);

            if (every15 || everyEOM) {
                bot.channels.cache.get(myChannel).send("@everyone It's payday! 🎉");
                bot.channels.cache.get(servethCh).send("@everyone It's payday! 🎉");
            }
        },999);       
    }
}
