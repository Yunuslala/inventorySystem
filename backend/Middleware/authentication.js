
const jwt=require("jsonwebtoken");
require('dotenv').config()
const authentication=(req,res,next)=>{
    let token=req.headers.authorization;
    let decoded=jwt.verify(token,process.env.Secret);
    if(decoded){
        console.log(1,decoded);
        req.body.userid=decoded.userid;
        req.body.email=decoded.useremail
        return next()
    }else{
        res.status(404).send({msg: `User does not exists`});
    }
};
module.exports={
    authentication
}