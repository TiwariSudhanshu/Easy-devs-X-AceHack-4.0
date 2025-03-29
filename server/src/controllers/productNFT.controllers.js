import { ethers } from "ethers";
import fs from "fs";
import path from "path";

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

import { fileURLToPath } from "url";

// Fix __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const contractPath = "../../../contract/artifacts/contracts/ProductTracking.sol/ProductTracking.json";
const contractPath = "../../../contract/artifacts/contracts/ProductTracking.sol/ProductTracking.json"
const contractPath1 = path.resolve(__dirname,contractPath)
// Load and parse contract ABI
// console.log(contractPath);


let contractData;
try {
    contractData = JSON.parse(fs.readFileSync(contractPath1, "utf8"));
    console.log("contract data :",contractData);
} catch (error) {
    console.error("❌ Error reading contract ABI file:", error);
    process.exit(1);
}

const CONTRACT_ABI = contractData.abi;
const CONTRACT_ADDRESS = "0x6cD8e9Ec75A373CA74762240310cEd9DEf60f1a9"

if (!CONTRACT_ADDRESS) {
    console.error("❌ CONTRACT_ADDRESS is not set in environment variables.");
    process.exit(1);
}

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

// ✅ Function to mint NFT
export const addProduct = async (req, res) => {
    try {
        const { recipient, name, price, category } = req.body;

        if (!recipient || !name || !price || !category) {
            return res.status(400).json({ error: "Missing required fields: recipient, name, price, category" });
        }

        console.log(`📦 Minting NFT for: Name=${name}, Price=${price}, Category=${category}`);
        const productInfo = `${name},${price},${category}`;

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
};

// ✅ Function to fetch NFT details by token ID
export const getProductById = async (req, res) => {
    try {
        const { tokenId } = req.params;

        if (!tokenId) {
            return res.status(400).json({ error: "Token ID is required" });
        }

        const owner = await contract.ownerOf(tokenId);
        console.log(`🔍 Owner of NFT ${tokenId}: ${owner}`);

        res.status(200).json({ tokenId, owner });

    } catch (error) {
        console.error("❌ Error fetching NFT:", error);
        res.status(500).json({ error: error.reason || error.message });
    }
};

// ✅ Function to transfer NFT
export const transferProduct = async (req, res) => {
    try {
        const { from, to, tokenId } = req.body;

        if (!from || !to || tokenId === undefined) {
            return res.status(400).json({ error: "Missing required fields: from, to, tokenId" });
        }

        console.log(`🔄 Transferring NFT ID=${tokenId} from ${from} to ${to}`);

        const tx = await contract.transferProductNFT(to, tokenId);
        console.log(`⏳ Transaction sent: ${tx.hash}`);

        const receipt = await tx.wait();
        console.log(`📝 Full Receipt:`, receipt);

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
};
