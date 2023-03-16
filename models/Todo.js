import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: false,
        require: true
    },
    userId: {
        type: String
    },
    todoImage: {
        type: Buffer
    }
})

export default model('Todo', TodoSchema)