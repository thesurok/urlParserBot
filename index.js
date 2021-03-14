const TelegramBot = require('node-telegram-bot-api');
// const token = '1654602084:AAFeNIKC2MeBf9jRz30gQPVx4LUpOCAZW2Y';
const { GOOGLE_CLOUD_PROJECT_ID, TELEGRAM_BOT_TOKEN, GOOGLE_CLOUD_REGION } = process.env;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });


const Parser = require('./Parser');
const parser = new Parser();
parser.init().then(run);


bot.telegram.setWebhook(
    `https://${GOOGLE_CLOUD_REGION}-${GOOGLE_CLOUD_PROJECT_ID}.cloudfunctions.net/${process.env.FUNCTION_TARGET}`
);

function run() {
    bot.on('message', sendParsedData);

    async function sendParsedData(msg) {
        const { id: chatID } = msg.chat;
        const { text } = msg;
        const formattedText = await parser.parseUrls(text);
        const config = {
            parse_mode: 'HTML',
            disable_web_page_preview: true
        }
        bot.sendMessage(chatID, formattedText, config);
    }
}

exports.telegramBotWebhook = (req, res) => {
    bot.handleUpdate(req.body, res);
};


