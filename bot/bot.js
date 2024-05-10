import { Telegraf } from 'telegraf';

const web_link = 'https://all-about-crypto.vercel.app/';

const bot = new Telegraf('7133580938:AAGzEmUaMqNRg_PpG1piggv5zQtgZx3DfIE');

bot.start((ctx) =>
  ctx.reply('All About NFTs - Learn more about NFTs', {
    reply_markup: {
      keyboard: [[{ text: 'Check App', web_app: { url: web_link } }]],
    },
  })
);

bot.command('quit', (ctx) => ctx.reply('See you soon!'));

bot.launch();
