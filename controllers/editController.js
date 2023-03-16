import Todo from "../models/Todo.js";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url"

const editTodo = async (req, res) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const { id } = req.params
    const todo = await Todo.findById(id)
    if (todo.userId === req.user.userId) {

        const updateObject = {}
        const { description, title } = req.body
        if (description && title) {
            updateObject.title = title
            updateObject.description = description
        }
        if (description) updateObject.description = description
        if (title) updateObject.title = title
        if (req.file?.filename) {
            updateObject.todoImage = req.file.filename
            const imagePath = path.join(__dirname, '..', 'public', 'uploads', todo.todoImage.toString())
            fs.unlink(imagePath, err => {
                if (err) {
                    console.log(err)
                }
            })
        }

        await Todo.findByIdAndUpdate(id, updateObject)
        res.status(200).send({
            message: 'TODO IS DONE'
        })
    } else {
        res.status(400).send({
            message: 'USER VALIDATION FAILED'
        })
    }
}

export { editTodo }