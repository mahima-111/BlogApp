import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('connected to mongo db');
}).catch((err)=>{
    console.log(err);
});

const db=mongoose.Connection;
export default db;