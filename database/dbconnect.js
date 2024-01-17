import mongoose from "mongoose";
const dbconnect=async()=>{
    try{
        await mongoose.connect(process.env.DBURL)
        console.log('database connected successfully');
    }
    catch(error){
        console.log(`MongoDB connection error: ${error}`);
    }
  
}
export default dbconnect;