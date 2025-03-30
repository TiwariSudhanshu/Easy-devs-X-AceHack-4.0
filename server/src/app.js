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
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express.json());

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);


app.post("/add-product", async (req, res) => {
    try {
        const { recipient, name, price, description } = req.body;
        console.log(`📦 Minting NFT for: Name=${name}, Price=${price}, Category=${description}`);

        if (!recipient || !name || !price || !description) {
            return res.status(400).json({ error: "Missing required fields: recipient, name, price, description" });
        }

        console.log(`📦 Minting NFT for: Name=${name}, Price=${price}, Category=${description}`);
        const productInfo = `${name},${price},${description}`;

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


app.get("/get-all-products", async (req, res) => {
    try {
        // Fetch all token IDs from the smart contract
        const tokenIds = await contract.getAllContractTokens();

        // Convert BigInt values to strings
        const formattedTokenIds = tokenIds.map(id => id.toString());

        res.json({ tokens: formattedTokenIds, length: formattedTokenIds.length });
    } catch (error) {
        console.error("❌ Error fetching all products:", error);
        res.status(500).json({ error: error.message });
    }
});


app.get("/get-ownership-history/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        // Fetch ownership history from the smart contract
        const history = await contract.getOwnershipHistory(productId);

        // Convert addresses to strings (if needed)
        const formattedHistory = history.map(address => address.toString());

        res.json({ productId, ownershipHistory: formattedHistory });
    } catch (error) {
        console.error("❌ Error fetching ownership history:", error);
        res.status(500).json({ error: error.message });
    }
});


app.post("/transfer-nft", async (req, res) => {
    try {
        const { from, to, tokenId } = req.body;

        // Ensure parameters are provided
        if (!from || !to || tokenId === undefined) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        // Verify sender owns the NFT
        const owner = await contract.ownerOf(tokenId);
        console.log(`Owner of tokenId ${tokenId}: ${owner}`);
        console.log(`Sender: ${from}`);
        
        if (owner.toLowerCase() !== from.toLowerCase()) {
            return res.status(403).json({ error: "Sender is not the owner of this NFT" });
        }

        // Send transaction from backend
        const tx = await contract.transferFrom(from, to, tokenId);
        await tx.wait(); // Wait for transaction to be mined

        res.json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        console.error("❌ Error transferring NFT:", error);
        res.status(500).json({ error: error.reason || error.message });
    }
});

// 0xEbb89aaB333A28de574262FA0f8A4C6df9F66702



// app.post("/transfer-nft", async (req, res) => {
//     try {
//         const { from, to, tokenId } = req.body;

//         if (!from || !to || tokenId === undefined) {
//             return res.status(400).json({ error: "Missing required parameters" });
//         }

//         // Check if `from` is the current owner
//         const owner = await contract.ownerOf(tokenId);
//         if (owner.toLowerCase() !== from.toLowerCase()) {
//             return res.status(403).json({ error: "Sender is not the owner of this NFT" });
//         }

//         // Execute transfer using backend signer
//         const tx = await contract.transferFrom(from, to, tokenId);
//         await tx.wait(); // Wait for transaction confirmation

//         res.json({ success: true, transactionHash: tx.hash });
//     } catch (error) {
//         console.error("❌ Error transferring NFT:", error);
//         res.status(500).json({ error: error.reason || error.message });
//     }
// });




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



















// {
//     "recipient": "0xdCbE9773B8df79F49b3EC77eD816d5E56dD341fb",
//     "name": "Laptop",
//     "price": "1200",
//     "category": "Electronics"
// }

