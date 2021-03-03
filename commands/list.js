module.exports = {
    name: 'list',
    description: 'Allows user to display a list of commands',
    execute(msg){
        msg.channel.send('```\nLIST OF COMMANDS for Botbotbot \n\n!list \n!login \n!logout \n!bio - sets a 5-min timer \n!break - sets a 10-min timer \n💩 - sets a 15-min timer \n!lunch - sets a 60-min timer; reminds after 55 mins \n!timer <number of minutes> - sets a custom timer. Example: !break 30 (sets a 30-min timer) \n!back \n\nOTHERS: \n• Reacts 👋 to "hello" and "hi"\n• Weekly Meeting (THU 17:00) reminders: 16:30, 16:55 and 17:00 \n• Payday reminder: 1st and 15th of the month```');
    }
}