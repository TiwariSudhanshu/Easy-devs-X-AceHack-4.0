import { ProductModel } from "../models/product.model.js";
import uploadFileTo_IFPS_Database from "../utility/upload-file.js";

const addProduct = async (req,res) => {
    try {
        const {productName} = req.body;

        console.log(`Adding product ${productName}`);
        

        if(!productName){
            console.log(`Product not found`);
            return res.status(404).json({
                success:false,
                message:"product Name is required"
            })
        }

        // generate NFT ID

        const productNFTId = ""

        console.log(`NFT ID: ${productNFTId}`);
        // save to database

        const newProduct = await uploadFileTo_IFPS_Database()

        console.log(`Product ${newProduct} added to the database`);
        
        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newProduct
        })

    } catch (error) {
        console.error(`Error adding product: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        })
        
    }
}

export {addProduct}