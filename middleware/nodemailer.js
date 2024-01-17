import nodemailer from 'nodemailer'
const sendEmail=(req,res,next)=>{
    try{
        const transporter= nodemailer.createTransport({
            service:'gmail',
            auth: {
                user:'binodlamichhane145@gmail.com',
                pass:'vdzu sybc mxar dpfo'
            }
        });
         transporter.sendMail({
            from:'binodlamichhane145@gmail.com',
            to:`${req.body.email}`,
            subject:`email verification`,
            test:`550022`
        },(error)=>{
            if(error){
                console.log('email send failed');
                res.status(500).json({
                    status:'failed',
                    message:'email send failed',
                    error:error
                })
            }else{
                console.log('email send successfully')
                next();
            }
            
        })
    }catch(error){
        res.status(500).json({
            status:'failed',
            message:'email cannot be send',
            error:error
        })
    }
}
export default sendEmail;