import { connect } from "mongoose";
import { config } from "dotenv";
import { error } from "console";

config();

connect(process.env.MONGODB_URL).then(()=>{
    console.log(`MongoDb Connected`)
}).catch((error)=>{
    console.log(error)
})

