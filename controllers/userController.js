import { OAuth2Client } from "google-auth-library";
import Users from "../models/usermodel.js"
import Query from "../models/querymodel.js";
// import gUsers from "../models/googelusermodel.js";

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

export const googleSignIn= async(req,res)=>{
    try{
        const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const {email,name} =payload;
        const userfound=await Users.findOne({email});
        if(userfound){
            res.status(200).json({
                message:"user signup successfully"
            })
        }else{
         
            const userCreated= await Users.create({email,name});
            res.status(200).json({
                message:"user signup successfully"
            })
        }
       
    }catch(error){
        res.status(500).json({
            message:"signIn failed"
        })
    }
  
}

export const googlelogin= async(req,res)=>{
    try{
        const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.CLIENT_ID,
        });
        console.log('binodddd')
        const payload = ticket.getPayload();

        const {email,name} =payload;
 
        const userfound=await Users.findOne({email});
        console.log('userfound',userfound);
        if(userfound?.email==email){
            console.log('email')
            const token=userfound.generateToken();
        
            res.cookie("token",token, { sameSite: 'none', secure: true});
            res.status(200).json({
                message:'login successfull'
            })
        }else{
            res.status(404).json({
                message:'You have not signIn'
            })
        }
    }catch(error){
        res.status(500).json({
            message:"cannot verify token",
            error:error
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