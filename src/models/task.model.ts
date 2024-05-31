import { Schema, model, Document } from 'mongoose';


interface iTask {
    title: string
    description: string
    deadline: Date
    priority: string
}

interface TaskDocument extends iTask, Document {}

const taskSchema = new Schema<TaskDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    priority: { type: String, required: true },
})

const Task = model<TaskDocument>('category', taskSchema)

export { Task, iTask }