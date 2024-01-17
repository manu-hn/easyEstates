import Jwt  from "jsonwebtoken";
import { config } from "dotenv";
config();
export function generateToken(uid, username){
    try {
        const token = Jwt.sign({uid, username},process.env.JWT_SECRET_KEY )
        return token
    } catch (error) {
        console.log(error);
        return null
    }
}