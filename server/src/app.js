// import express from 'express';
// import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
// dotenv.config()


// const app = express();

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.use(cookieParser())

// // PRODUCT ROUTE
// import { productRouter } from './routes/product.route.js';

// app.use('/api/v1/', productRouter)

// export {app}






// import express from "express";
// // import cors from "cors";
// import { ethers } from "ethers";
// import dotenv from "dotenv";
// dotenv.config();
// // import contractabi from '../../contract/artifacts/contracts/ProductTracking.sol/ProductTracking.json'

// import fs from "fs";
// const contractData = JSON.parse(fs.readFileSync("../contract/artifacts/contracts/ProductTracking.sol/ProductTracking.json", "utf8"));


// const app = express();
// // app.use(cors());
// app.use(express.json());

// const CONTRACT_ADDRESS = "0xa7d4Ca249e64A9902F30B821cAEc65C589A27c4deb";
// const CONTRACT_ABI = [contractData.abi];

// const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

// app.post("/add-product", async (req, res) => {

//     console.log(contract, " contract");


//     try {
//         const { name, price, category } = req.body;
//         const tx = await contract.addProduct(name, price, category);
//         await tx.wait();
//         res.status(200).json({ message: "Product added successfully", transactionHash: tx.hash });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.get("/get-product/:id", async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const product = await contract.getProduct(productId);
//         res.json({ id: productId, name: product[0], price: product[1], category: product[2] });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const contractPath = "../contract/artifacts/contracts/ProductTracking.sol/ProductTracking.json";
const contractData = JSON.parse(fs.readFileSync(contractPath, "utf8"));

const CONTRACT_ABI = contractData.abi;

const app = express();
app.use(cors({
    origin:"*",
    methods:["GET", "POST"],
    credentials:true,
}));
app.use(express.json());

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

app.post("/add-product", async (req, res) => {
    try {
        const { recipient, name, price } = req.body;

        console.log(`📦 Minting NFT for: Name=${name}, Price=${price}`);


        if (!recipient || !name || !price ) {
            return res.status(400).json({ error: "Missing required fields: recipient, name, price, category" });
        }

        console.log(`📦 Minting NFT for: Name=${name}, Price=${price}`);
        const productInfo = `${name},${price},`;

        const tx = await contract.mintProductNFT(recipient, productInfo);
        console.log(`⏳ Transaction sent: ${tx.hash}`);

        const receipt = await tx.wait();
        console.log(`📝 Full Receipt:`, receipt);

        let tokenId = null;
        for (const log of receipt.logs) {
            try {
                const parsedLog = contract.interface.parseLog(log);
                if (parsedLog.name === "ProductMinted") {
                    tokenId = parsedLog.args.tokenId.toString();
                    break;
                }
            } catch (err) {
                continue;
            }
        }

        if (!tokenId) {
            console.warn("⚠️ Token ID not found in logs. Ensure the contract emits `ProductMinted`.");
            return res.status(500).json({ error: "Token ID not found in transaction logs" });
        }

        console.log(`✅ NFT Minted - Token ID: ${tokenId}`);

        res.status(200).json({
            message: "NFT Minted Successfully",
            transactionHash: receipt.transactionHash,
            tokenId
        });

    } catch (error) {
        console.error("❌ Error minting NFT:", error);
        res.status(500).json({ error: error.reason || error.message });
    }
});


app.get("/get-product/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        // Fetch product details and owner
        const [productDetails, owner] = await contract.getProductDetails(productId);

        if (!productDetails) {
            return res.status(404).json({ error: "Product not found" });
        }

        const [name, price, category] = productDetails.split(",");

        res.json({ id: productId, name, price, category, owner });

    } catch (error) {
        console.error("❌ Error fetching product:", error);
        res.status(500).json({ error: error.message });
    }
});


 
// 0xEbb89aaB333A28de574262FA0f8A4C6df9F66702

app.post("/transfer-product", async (req, res) => {
    try {
        const { from, to, tokenId } = req.body;

        if (!from || !to || tokenId === undefined) {
            return res.status(400).json({ error: "Missing required fields: from, to, tokenId" });
        }

        console.log(`🔄 Transferring NFT ID=${tokenId} from ${from} to ${to}`);

        // Send transaction
        const tx = await contract.connect(wallet).transferProductNFT(to, tokenId);
        console.log(`⏳ Transaction sent: ${tx.hash}`);

        const owner = await contract.ownerOf(2);
        console.log(`Owner of NFT 2: ${owner}`);

        const receipt = await tx.wait();
        console.log(`📝 Full Receipt:`, receipt);

        if (!receipt.transactionHash) {
            return res.status(500).json({ error: "Transaction failed" });
        }

        console.log(`✅ NFT Transferred - Transaction Hash: ${receipt.transactionHash}`);

        res.status(200).json({
            message: "NFT Transferred Successfully",
            transactionHash: receipt.transactionHash,
            tokenId
        });

    } catch (error) {
        console.error("❌ Error transferring NFT:", error);
        res.status(500).json({ error: error.reason || error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



















// {
//     "recipient": "0xdCbE9773B8df79F49b3EC77eD816d5E56dD341fb",
//     "name": "Laptop",
//     "price": "1200",
//     "category": "Electronics"
// }

