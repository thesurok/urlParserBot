// require('dotenv').config();

// const Parser = require('./Parser');
// const parser = new Parser();
// parser.init();

const { Telegraf, Extra } = require('telegraf');
// const { GOOGLE_CLOUD_PROJECT_ID, BOT_TOKEN, GOOGLE_CLOUD_REGION } = process.env;

const bot = new Telegraf('1654602084:AAFeNIKC2MeBf9jRz30gQPVx4LUpOCAZW2Y');
// const bot = new Telegraf(BOT_TOKEN);

bot.on('text', (ctx) => {
    ctx.reply("test123");
    const { text } = ctx.message;
    // parser.parseUrls(text).then((res, rej) => {
    //     ctx.replyWithHTML(res, Extra.webPreview(false));
    // })
    //     .catch(err => {
    //         ctx.reply("ERROR!");
    //     });
});

bot.launch();

// bot.telegram.setWebhook(
//     `https://${GOOGLE_CLOUD_REGION}-${GOOGLE_CLOUD_PROJECT_ID}.cloudfunctions.net/${process.env.FUNCTION_TARGET}` //FUNCTION_TARGET is reserved Google Cloud Env
// );

// exports.telegramBotWebhook = (req, res) => {
//     bot.handleUpdate(req.body, res);
// };

