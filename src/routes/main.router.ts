import { Composer } from "grammy";
import { MyContext } from "../types/context";

import mainMarkup from "../markups/main.markup";


export const main = new Composer<MyContext>();

main.on(':text', async (ctx) => {
    await ctx.reply("💫 Tugmalardan birini tanlang", { reply_markup: mainMarkup });
});