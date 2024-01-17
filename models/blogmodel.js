import { Schema, model } from "mongoose";
const blogSchema = new Schema({
  title: { type: String, required: [true, "please provide a title"] },
  details: { type: String, required: true },
},{timestamps:true});
const Blogs= model('Blogs',blogSchema);
export default Blogs;
