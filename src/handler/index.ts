import { Composer } from "grammy";
import { MyContext } from "../types/context";

import { startInit } from "../routes/start.router";
import showCategories from "../markups/categories.markup";



const handler = new Composer<MyContext>();

handler.command('start', startInit);

handler.callbackQuery(/main:/, async (ctx) => {
    const action: string = ctx.callbackQuery.data.split(':')[1]
    

    if (action == "categories") {
        await ctx.deleteMessage();
        await ctx.reply("⚙️ Bo'limlar:", { reply_markup: await showCategories(ctx.from.id.toString()) });
        return ctx.session.state = 'categories'
    }

})


export default handler