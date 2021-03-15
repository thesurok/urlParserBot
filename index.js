require('dotenv').config();

const Parser = require('./Parser');
const parser = new Parser();
parser.init();

const { Telegraf, Extra } = require('telegraf');
const { BOT_TOKEN } = process.env;

const bot = new Telegraf(BOT_TOKEN);

bot.on('text', (ctx) => {
    const { text } = ctx.message;
    parser.parseUrls(text).then((res, rej) => {
        ctx.replyWithHTML(res, Extra.webPreview(false));
    })
        .catch(err => {
            ctx.reply("ERROR!");
        });
});

bot.launch();


