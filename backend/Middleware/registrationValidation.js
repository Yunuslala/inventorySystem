const {UserModel}=require("../Models/user.Model");

const RegistrationValidation=async(req,res,next)=>{
    const data=req.body;
    console.log(data);
    if(!data.name || !data.age || !data.email || !data.password){
        res.status(400).send({ msg: `Please provide name, age, email & Password`});
    }else {
        console.log("obj");
        let findUser=await UserModel.find({email:data.email});
        console.log("1",findUser);
        if(findUser.length==0){
            console.log("obj2");
            return next()
        }else{
            res.status(200).send({"msg":"Already registersd"})
        }
       
    }
}

module.exports={
    RegistrationValidation
}