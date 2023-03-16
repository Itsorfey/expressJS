import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { registerUser } from "./controllers/regController.js";
import { loginUser } from "./controllers/authController.js";
import { validateLogin } from "./validators/loginValidator.js";
import { validationErrors } from "./middlewares/validationErrors.js";
import { verifyToken } from "./middlewares/verifyToken.js";
import { createTodo } from "./controllers/createTodoController.js";
import { getAllTodos } from "./controllers/getAllTodosController.js";
import { deleteTodo } from "./controllers/deleteController.js";
import { doneTodo } from "./controllers/doneController.js";
import { editTodo } from "./controllers/editController.js";
import { getUsername } from "./controllers/userNameController.js";
import { upload } from './middlewares/multer.js'
import { multerError } from "./middlewares/multerError.js";
import { verifyEmail } from "./controllers/verifyController.js";
import { forgetPassword } from "./controllers/forgetPasswordController.js";
import { confirmCode } from "./controllers/confirmCode.js";

dotenv.config()

mongoose
    .set('strictQuery', false)
    .connect(process.env.DATABASE_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('DB SUCCESS'))
    .catch((err) => console.log(err))

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Express Success')
})

app.get('/verify-email/:token', verifyEmail)
app.post('/reg', validateLogin, validationErrors, registerUser)
app.post('/login', validateLogin.slice(0, 2), validationErrors, loginUser)
app.post('/create-todo', verifyToken, upload, multerError, createTodo)
app.get('/get-all-todos/:page', verifyToken, getAllTodos)
app.delete('/delete-todo/:id', verifyToken, deleteTodo)
app.patch('/done-todo/:id', verifyToken, doneTodo)
app.patch('/edit-todo/:id', verifyToken, upload, multerError, editTodo)
app.get('/get-username', verifyToken, getUsername)
app.patch('/forget-password', forgetPassword)
app.post('/confirm-code', confirmCode)



const port = process.env.PORT || 4000
app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('SERVER OK')
})

// 1)Возьмите api бургеров, сохраните на сервере
// и напишите get запрос, который на фронте вытащит
// этот API