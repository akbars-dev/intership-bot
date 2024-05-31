import { InlineKeyboard } from "grammy";
import { Category } from "../models/categories.model";



export default async function showCategories(userId: string) {
    const categories = await Category.find({ userId: userId });
    const categoriesMarkup = new InlineKeyboard();

    categories.forEach((category) => {
        categoriesMarkup.text(category.name, `category:${category._id}`).row()
    })


    categoriesMarkup.text("⬅️", 'categories:back')
    categoriesMarkup.text("➕", 'categories:plus')

    return categoriesMarkup
}


