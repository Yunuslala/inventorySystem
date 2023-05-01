const express=require("express");
const {InventryModel}=require("../Models/Inventory.model")
const InventoryRouter=express.Router();
const {authentication}=require("../Middleware/authentication");
const {authorization}=require("../Middleware/authorizationAdmin");
InventoryRouter.use(authentication)
InventoryRouter.post("/inventory",async(req,res)=>{
    try {
        const data=req.body;
        let inventoryData=new InventryModel(data);
        await inventoryData.save();
        res.status(201).send({"msg":"Inventory data has been posted"})
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong",error});
    }
});

InventoryRouter.get("/inventory",async(req,res)=>{
    try {
        let inventoryData=await InventryModel.find();
        res.status(200).send(inventoryData)
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong",error});
    }
})
InventoryRouter.get("/inventory/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let inventoryData=await InventryModel.find({_id:id});
        res.status(200).send(inventoryData)
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong",error});
    }
})
InventoryRouter.delete("/inventory/:id",authorization,async(req,res)=>{
    try {
        let id=req.params.id;
        let inventoryData=await InventryModel.findByIdAndDelete({_id:id});
        console.log();
        if(!inventoryData){
            res.status(404).send({"msg":"particular data is not available"})
        }
        res.status(204).send({"msg":"Particular inventory item deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong",error});
    }
})
InventoryRouter.put("/inventory/:id",authorization,async(req,res)=>{
    try {
        let id=req.params.id;
        let body=req.body;
        let inventoryData=await InventryModel.findByIdAndUpdate({_id:id},body);
        res.status(204).send({"msg":"Particular inventory item deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong",error});
    }
});

module.exports={
    InventoryRouter
}