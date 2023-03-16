import Todo from "../models/Todo.js"

const getAllTodos = async (req, res) => {
    const { userId } = req.user
    const { page } = req.params || 1
    const limit = 5
    const skip = (page - 1) * limit
    const todos = await Todo.find({ userId }).skip(skip).limit(limit)
    const totalTodos = await Todo.countDocuments({ userId })
    const totalPages = Math.ceil(totalTodos / limit)
    const clientsTodos = todos.map(todo => {
        const { userId, __v, ...rest } = todo.toObject()
        if (rest.todoImage) {
            rest.todoImage = `${req.protocol}://${req.get('host')}/uploads/${todo.todoImage}`
        }
        return rest
    })
    res.status(200).json({
        todos: clientsTodos,
        totalPages: totalPages,
        currentPage: page
    })
}
export { getAllTodos }