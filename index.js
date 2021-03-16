require('dotenv').config();

const Parser = require('./Parser');
const parser = new Parser();

const { Telegraf } = require('telegraf');
const { BOT_TOKEN } = process.env;

const bot = new Telegraf(BOT_TOKEN);

parser.init().then(run);

function run() {
    bot.start((ctx) => {
        ctx.reply(`Привет, ${ctx.from.first_name}! Отправь мне ссылку (или несколько ссылок) на предстоящую комнату Clubhouse и я пришлю тебе данные в красиво оформленном виде 😉`);
    });
    bot.on('text', (ctx) => {
        const { text } = ctx.message;
        parser.parseUrls(text).then((res, rej) => {
            ctx.replyWithHTML(res, { disable_web_page_preview: true });
        })
            .catch(err => {
                console.log(err);
            });
    });

    bot.launch();
}




