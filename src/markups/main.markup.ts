import { InlineKeyboard } from "grammy";

const mainMarkup = new InlineKeyboard();

mainMarkup.text("⚙️ Bo'limlar", 'main:categories');
mainMarkup.text("📔 Vazifalar", 'main:tasks');



export default mainMarkup