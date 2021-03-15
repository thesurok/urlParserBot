// require('dotenv').config();

const Parser = require('./Parser');
const parser = new Parser();

const { Telegraf } = require('telegraf');
const { BOT_TOKEN, BOT_DOMAIN, THROWAWAY_TOKEN } = process.env;

console.log(THROWAWAY_TOKEN);
console.log(THROWAWAY_TOKEN === '1639388823:AAEJfhDqKeiYyznBbyDArdGo2c8SH6PPBj4');

const bot = new Telegraf(THROWAWAY_TOKEN);

parser.init();

bot.on('text', (ctx) => {
    const { text } = ctx.message;
    parser.parseUrls(text).then((res, rej) => {
        ctx.replyWithHTML(res);
    })
        .catch(err => {
            console.log(err);
            ctx.reply("ERROR!");
        });
});

bot.launch();


