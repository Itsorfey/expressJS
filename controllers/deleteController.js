import Todo from "../models/Todo.js"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url"

const deleteTodo = async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id)
    if (todo.userId === req.user.userId) {
        const __dirname = path.dirname(fileURLToPath(import.meta.url))
        if (todo.todoImage) {
            const imagePath = path.join(__dirname, '..', 'public', 'uploads', todo.todoImage.toString())
            fs.unlink(imagePath, err => {
                if (err) {
                    console.log(err)
                }
            })
        }
        await Todo.findByIdAndDelete(id)
        res.status(200).send({
            message: 'TODO IS DELETED'
        })
    } else {
        res.status(400).send({
            message: 'USER VALIDATION FAILED'
        })
    }
    if (todo.todoImage) {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
    }
}

export { deleteTodo }

