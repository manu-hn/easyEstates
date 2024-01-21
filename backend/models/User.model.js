
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        default: "user"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
    },
}, { timestamps: true });


const UserModel = model('user', UserSchema);
export default UserModel;