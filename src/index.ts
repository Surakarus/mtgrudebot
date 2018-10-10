const Telegraf = require('telegraf');

const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
// process.env.BOT_TOKEN ||
const bot = new Telegraf(process.env.BOT_API_KEY);

bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'));
bot.command('inline', (ctx) => {
    return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
        m.inlineKeyboard([
            m.callbackButton('Coke', 'Coke'),
            m.callbackButton('Pepsi', 'Pepsi')
        ])))
});
bot.action('Coke',(ctx) => ctx.reply('Good!'));
bot.startPolling();