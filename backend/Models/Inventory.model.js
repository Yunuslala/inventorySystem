const mongoose=require("mongoose");


const inventrySchema=mongoose.Schema({
    name:String,
    price:Number,
    description:String
});

const InventryModel=mongoose.model("Items",inventrySchema);

module.exports={
    InventryModel
}