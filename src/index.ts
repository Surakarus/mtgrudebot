import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
const Telegraf = require('telegraf');
import "reflect-metadata";
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
// process.env.BOT_TOKEN ||
const bot = new Telegraf(process.env.BOT_API_KEY);
import {UserService} from "./services/user.service";
import * as fs from "fs";

createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
    //
    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);
    //
    // console.log("Here you can setup and run express/koa/any other framework.");
    
}).catch(error => console.log(error));
let userservice = new UserService();
bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => {
    ctx.reply('👍');
    console.log(ctx.update.message.from);
    userservice.findUser(ctx.update.message.from.id).then((response) => {
        if (response===undefined) {
            let user = new User();
            user.id = ctx.update.message.from.id;
            user.firstName = ctx.update.message.from.first_name;
            user.lastName = ctx.update.message.from.last_name;
            user.username = ctx.update.message.from.username;
            userservice.addUser(user);
        } else {
            console.log(response);
        }
    });
});
bot.hears('/stealtv', (ctx) => {
    let user = ctx.update.message.from;
    ctx.replyWithAudio({ source: './stealtv.mp3' },
        {title: `Слыш ты, ${user.username?user.username:user.first_name+" "+user.last_name}`
        })
});
// bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'));
// bot.command('inline', (ctx) => {
//     return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
//         m.inlineKeyboard([
//             m.callbackButton('Coke', 'Coke'),
//             m.callbackButton('Pepsi', 'Pepsi')
//         ])))
// });
// bot.action('Coke',(ctx) => {
//     ctx.reply('Good!');
//     console.log(ctx.from);
// });
// bot.action('Pepsi', (ctx) => {
//     ctx.reply('OK');
// })
bot.startPolling();