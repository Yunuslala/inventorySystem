const checkAdmin=require("../admin.json");

const authorization=(req,res,next)=>{
    if(!checkAdmin.admins.includes(req.body.useremail)){
        res.status(401).send({"msg":"You are not admin"})
    }else{
        next()
    }
    
};

module.exports={
    authorization
}