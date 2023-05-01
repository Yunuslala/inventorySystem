const express=require("express");
const UserRouter=express.Router();
const {UserModel}=require("../Models/user.Model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require('dotenv').config();
const {RegistrationValidation}=require("../Middleware/registrationValidation");
const {loginvalidator}=require("../Middleware/loginValidator");



UserRouter.post("/user/registration",RegistrationValidation,async(req,res)=>{
    try {
        let {name,age,password,email}=req.body;
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(500).send({"msg":"something went wrong in password hashing"})
            }else{
                console.log({name,age,password:hash,email});
                const saveData=new UserModel({name,age,password:hash,email});
                await saveData.save();
                res.status(201).send({"msg":"Registration succesfull"})
            }
        })        
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong",error});
    }

})
UserRouter.post("/user/login",loginvalidator,async(req,res)=>{
    try {
        let {email,password}=req.body;
        let findUser=await UserModel.find({email});
        if(!findUser){
            res.status(404).send({"msg":" you have not registered or give wrong credetials"})
        }else{
            bcrypt.compare(password,findUser[0].password,async(err,result)=>{
                if(err){
                    res.status(500).send({"msg":"error in comparing the password"})
                }else{
                    console.log(findUser[0].email);
                   let token=jwt.sign({useremail:email,userid:findUser[0]._id},process.env.Secret);
                   console.log(token);
                   res.status(201).send({"msg":"successfully log in",token})
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong",error});
    }
});

module.exports={
    UserRouter
}