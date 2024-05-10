import { Telegraf } from 'telegraf';

const web_link = 'https://all-about-crypto.vercel.app/';

const bot = new Telegraf(import.meta.env.VITE_BOT_ID);

bot.start((ctx) =>
  ctx.reply('All About NFTs - Learn more about NFTs', {
    reply_markup: {
      keyboard: [[{ text: 'Check App', web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
