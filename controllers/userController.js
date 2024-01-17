
import Users from "../models/usermodel.js"
import Query from "../models/querymodel.js";


//signup
export const signup= async(req,res)=>{
    try{
const {name,email,password,confirmPassword}=req.body;
if(password==confirmPassword){
    console.log('binodis password free');
    const findEmail= await Users.find({email});
    console.log('findemail',findEmail);
    if(findEmail[0]?.email==email){
        console.log('email');
         res.status(409).json({message:"User already exists!"})
    }else{
        console.log('email2',req.body);
        const userCreated= await Users.create({...req.body});
        res.status(200).json({
            message: 'User created successfully!',
        })
    }
}}catch(error){
    console.log('email3',error);
    res.status(500).json({
        message: error.message
    })
}
}

//login
export const login= async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await Users.findOne({email});
        console.log('userfind',user);
        if(user){
            const ismatch= await user.comparePassword(password);
            console.log('ismatch',ismatch);
            if(ismatch){
                const token=user.generateToken();
                console.log('token created',token);
                res.cookie("token",token, { sameSite: 'none', secure: true});
                res.status(200).json({
                    message:'cookies send successfully',
                })
            }
        }else{
            throw new Error('authentication failedd');
        }
    }catch(error){
        res.status(403).json({
            message: "Authentication failed!"
        })
    }
  

}
export const query=async(req,res)=>{
    try{
        const response = await Query.create({...req.body});
        res.status(200).json({
            status:'success',
            message:'query submited successfully'
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

// {httpOnly:false,sameSite:'None',secure:false, maxAge:900000,domain: 'http://127.0.0.1:5173',path:'/'