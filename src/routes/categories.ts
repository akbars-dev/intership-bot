import { Composer, InlineKeyboard } from "grammy";
import { MyContext } from "../types/context";
import { Category } from "../models/categories.model";

import mainMarkup from "../markups/main.markup";
import showCategories from "../markups/categories.markup";


export const categories = new Composer<MyContext>();

categories.callbackQuery(/categories:(.+)/, async (ctx) => {
    const action = ctx.callbackQuery.data.split(':')[1];

    if (action === 'back') {
        await ctx.deleteMessage();
        await ctx.reply("💫 Tugmalardan birini tanlang", { reply_markup: mainMarkup });
        ctx.session.state = 'main';
    } else if (action === 'plus') {
        await ctx.deleteMessage();
        await ctx.reply("💫 Bo'lim nomini kiriting: ");
        ctx.session.fsm = 'add';
    }
});

categories.callbackQuery(/category:(.+)/, async (ctx) => {
    const action = ctx.callbackQuery.data.split(':')[1];

    const category = await Category.findById(action);

    const buttons = new InlineKeyboard()
        .text("📝 Tahrirlash", `edit:${category?.id}`).text("🗑 O'chirish", `delete:${category?.id}`).row().text('⬅️', 'step-back');

    await ctx.deleteMessage()
    return ctx.reply(`${category?.name}`, { reply_markup: buttons });
})

categories.callbackQuery(/edit:(.+)/, async (ctx) => {
    const action = ctx.callbackQuery.data.split(':')[1];
    await ctx.deleteMessage()
    await ctx.reply("💫 Bo'lim uchun yangi nom kiriting: ");
    ctx.session.fsm = 'edit';
    return ctx.session.data = { actionId: action }
})

categories.callbackQuery(/delete:(.+)/, async (ctx) => {
    const action = ctx.callbackQuery.data.split(':')[1];
    await Category.findByIdAndDelete(action);
    await ctx.deleteMessage()
    return await ctx.reply("⚙️ Bo'limlar: \n\n✅ Bo'lim muafaqiyatli o'chirildi", { reply_markup: await showCategories(ctx.from.id.toString()) });
})

categories.callbackQuery('step-back', async (ctx) => {
    await ctx.deleteMessage();
    await ctx.reply("⚙️ Bo'limlar:", { reply_markup: await showCategories(ctx.from.id.toString()) });
})

categories.on('message:text', async (ctx) => {
    const fsm = ctx.session.fsm;

    if (fsm === 'add') {
        const categoryName = ctx.message?.text;
        console.log(`Adding new category: ${categoryName}`);
        await Category.create({ name: categoryName, userId: ctx.from.id });
        await ctx.reply("✅ Yangi bo'lim qo'shildi", { reply_markup: await showCategories(ctx.from.id.toString()) });
        ctx.session.fsm = '';
    } else if (fsm === 'edit') {
        const category = await Category.findByIdAndUpdate(ctx.session.data.actionId, { name: ctx.message.text }, { new: true });
        const buttons = new InlineKeyboard()
            .text("📝 Tahrirlash", `edit:${category?.id}`).text("🗑 O'chirish", `delete:${category?.id}`).row().text('⬅️', 'step-back');
       
        await ctx.reply(`${category?.name}\n\n✅ Bo'lim muafaqiyatli tahrirlandi`, { reply_markup: buttons });
    }

    else {
        await ctx.reply("Iltimos, tegishli amalni tanlang.", { reply_markup: await showCategories(ctx.from.id.toString()) });
    }
});
