const express=require("express");

const {InventoryRouter,server,app}=require("./Router/Inventory");
const {UserRouter}=require("./Router/User")
const {connection}=require("./Config/db")
const cors=require("cors");


app.use(cors());
app.get("/",(req,res)=>{
    res.send("hii welcome")
})
app.use(express.json());
app.use(UserRouter);
app.use(InventoryRouter);


server.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected");
    }
    console.log(`http://localhost:${process.env.port}`);
})









