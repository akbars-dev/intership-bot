import 'dotenv/config';
import { Bot, Context } from 'grammy';

import errorMiddleware from './middlewares/error.middleware';
import sessionMiddleware from './middlewares/session.middleware';
import handler from './handler';
import router from './routes';


import { MyContext } from './types/context';
import { mongooseConnection } from './config/mongodb';



const bot = new Bot<MyContext>(process.env.BOT_TOKEN || '');

mongooseConnection()

//middlewares 
bot.use(sessionMiddleware);
bot.use(handler);
bot.use(router)
bot.catch(errorMiddleware);


bot.start({
    onStart: () => console.log("> Telegram bot started")
});
