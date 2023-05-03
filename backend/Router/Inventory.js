const express=require("express");
const {InventryModel}=require("../Models/Inventory.model")
const InventoryRouter=express.Router();
const {authentication}=require("../Middleware/authentication");
const {authorization}=require("../Middleware/authorizationAdmin");
const {inventroyValidator}=require("../Middleware/inventoryValidations")
InventoryRouter.use(authentication)
const app=express()


const http=require("http");
const socketIo=require("socket.io")
const server = http.createServer(app);
const io = socketIo(server);

const  socketFunction=(data)=>{
        console.log(data);
        io.on('connection', (socket) => {
            console.log('A client has connected.');
            socket.on('hello', async (msg) => {
              console.log(msg);
              socket.emit('welcome', "welcome from connection");
            });
            socket.on('disconnect', () => {
              console.log('A client has disconnected.');
            });
            // function postInventoryItem(){
            //   socket.emit("addInventery","One inventory data has been added")
            // }
            if(data){
                let key=Object.keys(data);
                socket.emit("get",data[key])

                // data=undefined;
            }
            
          });
   
}





InventoryRouter.post("/inventory",inventroyValidator,async(req,res)=>{
    try {
        const data=req.body;
        console.log(data)
        let inventoryData=new InventryModel(data);
        await inventoryData.save();
        socketFunction({"postmsg":"one inventory data has been posted"})
        res.status(201).send({"msg":"Inventory data has been posted"})
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong",error});
    }
});

InventoryRouter.get("/inventory",async(req,res)=>{
    try {
        let inventoryData=await InventryModel.find();
        // socketFunction({"deletemsg":"particular inventory data has been deleted"})
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
        socketFunction({"deletemsg":"particular inventory data has been deleted"})
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
        if(!inventoryData){
            res.status(404).send({"msg":"particular data is not available"})
        }
        socketFunction({"putmsg":"one inventory data has been updated"})
        res.status(204).send({"msg":"Particular inventory item deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong",error});
    }
});

module.exports={
    InventoryRouter,server,app
}