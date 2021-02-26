const moment = require('moment');
const Discord = require('discord.js');


module.exports = {
    name: 'weeklymeeting',
    description: 'Weekly meeting every Thursday, 5PM.',
    execute(bot,myChannel,servethCh){
        setInterval(function () {
            var dateToday = new Date();
            var meetStart = (dateToday.getDay() === 6) && (dateToday.getHours() === 23) && (dateToday.getMinutes() === 25) && (dateToday.getSeconds() === 00);
            var meet1hour = (dateToday.getDay() === 4) && (dateToday.getHours() === 8) && (dateToday.getMinutes() === 30) && (dateToday.getSeconds() === 00);
            var meet5min = (dateToday.getDay() === 4) && (dateToday.getHours() === 8) && (dateToday.getMinutes() === 55) && (dateToday.getSeconds() === 00);

            if (meetStart) {
                bot.channels.cache.get(myChannel).send("@everyone Our weekly meeting is starting! Join voice channel now.");
                //bot.channels.cache.get(servethCh).send("@everyone Our weekly meeting is starting! Join voice channel now.");
            }
            else if (meet1hour) {
                bot.channels.cache.get(myChannel).send("Weekly meeting in 30 minutes!");
                bot.channels.cache.get(servethCh).send("Weekly meeting in 30 minutes!");
            }
            else if (meet5min) {
                bot.channels.cache.get(myChannel).send("@everyone Weekly meeting in 5 minutes!");
                bot.channels.cache.get(servethCh).send("@everyone Weekly meeting in 5 minutes!");
            }
        }, 999);
    }
}
//const myChannel = client.channels.cache.get('811208862233002008');
//const reminderDate;
//const dateToday;
//function sendReminder()
//(dateToday.getDay() === 4) && (dateToday.getHours() === 17) && (dateToday.getMinutes() === 00) && (dateToday.getSeconds() === 00)