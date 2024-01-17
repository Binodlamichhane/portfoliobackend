import { Schema,model } from "mongoose";
const commentSchema=new Schema({
    blogId:{type:Schema.Types.ObjectId,ref:'Blogs'},
    comment:'string',
    userId:{type:Schema.Types.ObjectId,ref:'Users'}
},{timestamps:true});
const Comments = model('Comments',commentSchema);
export default Comments;