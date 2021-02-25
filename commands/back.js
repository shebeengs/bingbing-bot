module.exports = {
    name: 'back',
    description: 'Stops timer',
    execute(msg, setTimer){
        if (setTimer[msg.author.id] === undefined){
            msg.react('❌');
            msg.reply('You did not go on break.');
        }
        else {
            delete setTimer[msg.author.id];
            msg.reply('Welcome back!');
            console.log(setTimer);
        }
    }
}