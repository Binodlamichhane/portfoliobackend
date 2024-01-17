import { Schema,model } from "mongoose";
const querySchema=new Schema({
    name:'string',
    email:'string',
    phoneno:'string',
    query:'string'
})
const Query=model('Query',querySchema);
export default Query;