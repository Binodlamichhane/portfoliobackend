 import Blogs from "../models/blogmodel.js"
 import Comments from "../models/commentmodel.js";
 export const getBlog=async (req,res,next)=>{
    try{
        const response= await Blogs.find();
        res.status(201).json({
            status:'success',
            message:"blog found",
            data:response
        })

    }catch(error){
        res.status(500).json({
            status:'failed',
            message:'cannot find blog',
            error:error
        })
    }
}
 export const postBlog= async(req,res)=>{
    try{
        console.log('hello dear')
        const response = await Blogs.create({...req.body});
        res.status(201).json({
            status:'success',
            message:"Post created",
            data:response
        })
    }
    catch(error){
        res.status(500).json({
            status:'failed',
            message:'Post creation failed',
            error:error
        })
    }
   

 }
 export const getComment=async(req,res)=>{
    try{
        const response= await Comments.find({blogId:req.params.id}).populate("userId");
        res.status(200).json({
            status:'succes',
            data:response
        })
    }catch(error){
        res.status(500).json({
            status:'fail',
            message:'Error in fetching comments'

        })
    }
 }
 export const postComment=async(req,res)=>{
    try{
        console.log('binodfish');
        const response= await Comments.create({...req.body});
        res.status(200).json({
            status:'succes',
            data:response
        })
    }catch(error){
        res.status(500).json({
            status:'fail',
            message:'error inserting the comment'

        })
    }
 }