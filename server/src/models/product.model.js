import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    productNFTId:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const ProductModel = mongoose.model("ProductModel",productSchema)