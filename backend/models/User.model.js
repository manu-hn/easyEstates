
import { Schema, model } from "mongoose";

const UserSchema=new Schema({
    fullName : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    }
}, {timestamps : true});


const UserModel = model('user', UserSchema);
export default UserModel;