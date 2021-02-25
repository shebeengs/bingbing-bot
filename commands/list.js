const moment= require('moment');

module.exports = {
    name: 'list',
    description: 'Allows user to display a list of commands',
    execute(msg){
        msg.channel.send('```\nLIST OF COMMANDS for Botbotbot \n\n!list \n!login \n!logout \n!bio - sets a 5-min timer \n!break - sets a 10-min timer \n!timer <number of minutes> - sets a custom timer. Example: !break 15 (sets a 15-min timer) \n!back \n\nOTHERS: \n• Reacts 👋 to "hello" and "hi"\n• Weekly Meeting (THU 17:00) reminders: 16:30, 16:55 and 17:00 ```');
    }
}

//\n\nON-GOING: \n• Payroll reminders: 1st and EOM \n• Shift start/end reminders \n• Lunch start/end reminder \n• and more 😁

/* 
Payroll remiders
Shift start/end
Lunch start/end
Version updates?

 */