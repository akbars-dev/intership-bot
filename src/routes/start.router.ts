import { Composer } from "grammy";
import { MyContext } from "../types/context";

import mainMarkup from "../markups/main.markup";


export const start = new Composer<MyContext>();

export async function startInit(ctx: MyContext ) {
    await ctx.reply("👋 Assalomu Aleykum \n\n💫 Tugmalardan birini tanlang", { reply_markup: mainMarkup });
    return ctx.session.state = 'main';
}