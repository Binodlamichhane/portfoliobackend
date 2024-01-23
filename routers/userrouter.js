import express from "express";
import { signup,login,query, googlelogin, googleSignIn } from "../controllers/userController.js";
import sendEmail from "../middleware/nodemailer.js";
import { verifytoken,expiretoken } from "../middleware/verifytoken.js";
const router =express.Router();
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/query').post(query);
router.route('/verify').get(verifytoken,(req,res)=>{
    console.log('cookies found here');
    res.status(200).json({
        message:'this user is loggedin'
    })
})
router.route('/googleSignIn').post(googleSignIn)
router.route('/googlelogin').post(googlelogin);
router.route('/expire').get(expiretoken)
export default router;