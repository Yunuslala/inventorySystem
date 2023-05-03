const checkAdmin=require("../admin.json");

const authorization=(req,res,next)=>{
    console.log("2",req.body);
    if(!checkAdmin.admins.includes(req.body.email)){
        res.status(401).send({"msg":"You are not admin"})
    }else{
        next()
    }
    
};

module.exports={
    authorization
}