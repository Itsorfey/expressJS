import { Schema, model } from "mongoose";

const AuthSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    hash_pass: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
})

export default model('Auth', AuthSchema)