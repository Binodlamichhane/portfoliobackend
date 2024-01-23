import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
const userSchmea = new Schema({
  name: { type: "string", required: true, minLength: 2 },
  email: {
    type: "string",
    required: [true, "email cannot be empty"],
  },
  password: { type: "string", minLength: 8 },
});
userSchmea.pre('save', async function(next){
    if(!this.isModified('password')) return next();
   this.password= await bcrypt.hash(this.password,10);
   next();
})
userSchmea.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchmea.methods.generateToken=function(){
 const token=jwt.sign({_id:this._id,email:this.email},process.env.SECRET,{expiresIn:'1d'})
 return token;
}
const Users=model('Users',userSchmea);
export default Users;

