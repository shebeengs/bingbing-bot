//bingbing-bot: Botbotbot
require('dotenv').config();
const Discord = require('discord.js');
const moment = require('moment');
const fs = require('fs');
const DB = require('pg').Client;

//env var
const TOKEN = process.env.TOKEN;
const dbConn = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};
//clients
const bot = new Discord.Client();

//handlers
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();
bot.queries = new Discord.Collection();
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const queryFiles = fs.readdirSync('./queries/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	bot.events.set(event.name, event);
}
for (const file of queryFiles) {
	const query = require(`./queries/${file}`);
	bot.queries.set(query.name, query);
}

bot.login(TOKEN);
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

// events
// reminders
const myChannel = `811208862233002008`;
const servethCh = `801523538917064746`;

bot.events.get('weeklymeeting').execute(bot, myChannel, servethCh);
//bot.events.get('payroll').execute(bot, myChannel, servethCh);

//commands
const prefix = '!';
var setTimer = {};
var loginTime = {};
var breakLength;
var msgcounter;

bot.on('message', msg => {
    bot.events.get('msgcounting').execute(msgcounter,msg);
    if (msg.content === 'hello') {
        msg.react('👋');
    }
    else if (msg.content === 'hi') {
        msg.react('👋');
    }
    else if (msg.content === '💩') {
        breakLength = 15;
        bot.commands.get('biobreak').execute(msg, setTimer, breakLength);
    }
    //commands with prefix
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
        bot.commands.get('login').execute(msg, dbConn);
    }
    else if (command === 'logout') {
        bot.commands.get('logout').execute(msg, dbConn);
    }
    else if ((command === 'list') || (command === 'help')) {
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
    else if (command === 'lunch') {
        bot.commands.get('lunch').execute(msg, setTimer);
    }
    //queries
    else if (command === 'users'){
        bot.queries.get('users').execute(msg, dbConn);
    }
    else if (command === 'shift') {
        bot.queries.get('shift').execute(msg, dbConn, args);
    } else if (command === 'mylogins') {
        bot.queries.get('mylogins').execute(msg, dbConn, args);
    }
});
