require('dotenv').config();

const Parser = require('./Parser');
const parser = new Parser();

const { Telegraf } = require('telegraf');
const { BOT_TOKEN, BOT_DOMAIN } = process.env;

const bot = new Telegraf(BOT_TOKEN);

parser.init();

bot.on('text', (ctx) => {
    const { text } = ctx.message;
    ctx.reply("hello");
    // parser.parseUrls(text).then((res, rej) => {
    //     ctx.replyWithHTML(res);
    // })
    //     .catch(err => {
    //         console.log(err);
    //         ctx.reply("ERROR!");
    //     });
});

bot.launch({
    webhook: {
        domain: BOT_DOMAIN,
        port: Number(process.env.PORT),
    }
})


