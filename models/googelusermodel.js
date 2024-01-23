import { Schema,model } from "mongoose";
import jwt from "jsonwebtoken";
const googleUserSchema= new Schema({
    name:String,
    email:String,
})
googleUserSchema.methods.generateToken=function(){
    const token=jwt.sign({_id:this._id,email:this.email},process.env.SECRET,{expiresIn:'1d'});
    return token;
}
const gUsers = model('gUsers',googleUserSchema);
export default gUsers;