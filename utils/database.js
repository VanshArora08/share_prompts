import mongoose from "mongoose";
let isConnected=false;
export const connectToDB=async()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("mongodb is connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbname:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
        )
        isConnected=true;
        console.log("mongodb connected");
    }catch(err){
        console.log(err);
    }
}