import jwt from 'jsonwebtoken';
export const verifytoken= async(req,res,next)=>{
    try{
        const token =req.cookies.token;
        const user= jwt.verify(token,process.env.SECRET);
        if(user.email){
            req.body.userId=user._id;
            next();
        }else{
            throw new Error('invalid user')
        }
    }catch(error){
        console.log('fuck')
        res.status(401).json({
            message:error,
        })
    }
}
export const expiretoken=async(req,res)=>{
    try{
        const token=jwt.sign({this:'hiss'},process.env.SECRET,{expiresIn:'1s'});
        res.cookie('token',token,{ sameSite: 'none', secure: true})
        res.status(200).json({
            message:'logged out successfully'
        })
    }catch(error){
        res.status(500).json({
            message:'cannot logged out '
        })
    }
  
}