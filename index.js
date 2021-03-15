require('dotenv').config();

const Parser = require('./Parser');
const parser = new Parser();
parser.init();

// const { Telegraf, Extra } = require('telegraf');
const { Composer } = require('micro-bot');
// const { GOOGLE_CLOUD_PROJECT_ID, TELEGRAM_BOT_TOKEN, GOOGLE_CLOUD_REGION } = process.env;

const bot = new Composer;

bot.on('text', (ctx) => {
    const { text } = ctx.message;
    ctx.reply("test");
    // parser.parseUrls(text).then((res, rej) => {
    //     ctx.replyWithHTML(res, Extra.webPreview(false));
    // })
    //     .catch(err => {
    //         ctx.reply("ERROR!");
    //     });
});

module.exports = bot;

// bot.launch();

// bot.telegram.setWebhook(
//     `https://${GOOGLE_CLOUD_REGION}-${GOOGLE_CLOUD_PROJECT_ID}.cloudfunctions.net/${process.env.FUNCTION_TARGET}` //FUNCTION_TARGET is reserved Google Cloud Env
// );

// exports.telegramBotWebhook = (req, res) => {
//     bot.handleUpdate(req.body, res);
// };

// stark-bastion-63584
// https://stark-bastion-63584.herokuapp.com/

