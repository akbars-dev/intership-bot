import { Schema, model, Document } from 'mongoose';


interface iCategory {
    name: string
    userId: string
}

interface CategoryDocument extends iCategory, Document {}

const categorySchema = new Schema<CategoryDocument>({
    name: { type: String, required: true },
    userId: { type: String, required: true }
})

const Category = model<CategoryDocument>('category', categorySchema)

export { Category, iCategory }