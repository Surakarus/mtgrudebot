import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
const Telegraf = require('telegraf');
import "reflect-metadata";
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const bot = new Telegraf(process.env.BOT_API_KEY);
import {UserService} from "./services/user.service";
import * as fs from "fs";

createConnection().then(async c => {}).catch(error => console.log(error));

let userservice = new UserService();

const testMenu = Extra
	.markdown()
	.markup((m) => m.inlineKeyboard([
		m.callbackButton('Пойду', 'act_sure'),
		m.callbackButton('Возможно пойду', 'act_maybe')
	]));

let message = 'Список участников:';

bot.start((ctx) => ctx.reply('Ну давай поговорим...'));

bot.help((ctx) => ctx.reply("Rudebot v2.0.2\n" +
            "/help - отображение этого сообщения\n" +
            "/show - отображение списка текущих мероприятий\n"+
            "/stealtv - украсть телик\n"+
            "[Наш канал в Telegram](https://t.me/khamtg)", {"parse_mode": "Markdown"}));

bot.on('sticker', (ctx) => {
    ctx.reply('👍');
    console.log(ctx.update.message.from);
});

bot.hears('/stealtv', (ctx) => {
    let user = ctx.update.message.from;
    ctx.replyWithAudio({ source: './stealtv.mp3' },
        {title: `Слыш ты, ${user.username?'@'+user.username:user.first_name+" "+user.last_name}`
        })
});

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
  const offset = parseInt(inlineQuery.offset) || 0;

  if (inlineQuery.query!=''){
	  userservice.checkRights(inlineQuery.from.id).then((res) => {
		  if (res===undefined){
			  return answerInlineQuery([]);
		  } else {
			  return answerInlineQuery([{
				  type: 'article',
				  id: '0',
				  title: 'Запланировать мероприятие',
				  input_message_content: {
					  message_text: inlineQuery.query + '\n' + message
				  },
				  reply_markup: testMenu.reply_markup
			  }]).then(()=> {
				  message = inlineQuery.query + '\n' + message;
			  })
		  }
	  });
  }

});

bot.action(/^act_+/, async (ctx) => {
	userservice.findUser(ctx.update.callback_query.from.id).then((response) => {
		if (response===undefined) {
			let user = new User();
			user.id = ctx.update.callback_query.from.id;
			user.firstName = ctx.update.callback_query.from.first_name;
			user.lastName = ctx.update.callback_query.from.last_name;
			user.username = ctx.update.callback_query.from.username;
			userservice.addUser(user);
		} else {
			console.log(response);
		}
	});

    let option =  ctx.match['input'];
    let reply = 'Мямля!';
    if (option == 'act_sure'){
        reply = 'Молодец!';
    }
    const username = ctx.update.callback_query.from.username ?
	    '@' + ctx.update.callback_query.from.username :
	    ctx.update.callback_query.from.first_name + " " + ctx.update.callback_query.from.last_name;

    message = message + '\n' + username;

    return ctx.answerCbQuery(reply)
        .then(ctx.editMessageText(message, {reply_markup: testMenu.reply_markup }));
});

bot.startPolling();