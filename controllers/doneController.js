import Todo from "../models/Todo.js";

const doneTodo = async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id)
    if (todo.userId === req.user.userId) {
        await Todo.findByIdAndUpdate(id, { status: !todo.status })
        res.status(200).send({
            message: 'TODO IS DONE'
        })
    } else {
        res.status(400).send({
            message: 'USER VALIDATION FAILED'
        })
    }
}

export { doneTodo }