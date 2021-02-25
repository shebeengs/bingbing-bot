require('dotenv').config();
const Discord = require('discord.js');
const moment = require('moment');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
let db = new sqlite3.Database('./db/Botbotbot.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the Botbotbot SQlite database.');
  });

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.login(TOKEN);
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});
// reminders
const myChannel = `811208862233002008`;
const servethCh = `801523538917064746`;

bot.commands.get('weeklymeeting').execute(bot, myChannel, servethCh); // Weekly meeting every Thursday, 5PM.
//bot.commands.get('payroll').execute(bot, myChannel, servethCh); // Remind Micah to pay us every 15 and end of month.

const prefix = '!';
var setTimer = {};
var loginTime = {};
var breakLength;
bot.on('message', msg => {
    if (msg.content === 'hello') {
        msg.react('👋');
    }
    else if (msg.content === 'hi') {
        msg.react('👋');
    }
    //
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    // commands:
    if (command === 'timer') {
        bot.commands.get('timer').execute(msg, args, setTimer);
    }
    else if (command === 'back') {
        bot.commands.get('back').execute(msg, setTimer);
    }
    else if (command === 'login') {
        bot.commands.get('login').execute(msg, loginTime);
    }
    else if (command === 'logout') {
        bot.commands.get('logout').execute(msg, loginTime);
    }
    else if (command === 'list') {
        bot.commands.get('list').execute(msg);
    }
    else if (command === 'break') {
        breakLength = 10;
        bot.commands.get('biobreak').execute(msg, setTimer, breakLength);
    }
    else if (command === 'bio') {
        breakLength = 5;
        bot.commands.get('biobreak').execute(msg, setTimer, breakLength);
    }
});
