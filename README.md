# Secure Supply Chain on Web3

A blockchain-based supply chain management solution that provides transparency, security, and traceability for products throughout their lifecycle.

## Overview

This project leverages blockchain technology to create an immutable record of product movements across the supply chain. By utilizing smart contracts on the blockchain, we ensure data integrity and provide a trustless environment for all supply chain participants.

## Features

- *Product Registration*: Securely add new products to the blockchain with detailed metadata
- *Product Traceability*: Track the complete history of any product from manufacturing to delivery
- *Ownership Transfer*: Transfer product ownership between supply chain participants with cryptographic verification
- *Immutable Records*: All transactions are permanently recorded on the blockchain


## Technology Stack

- *Backend*: Node.js
- *Blockchain*: Ethereum/Solidity
- *Database*: IPFS , Off Chain
- *API*: RESTful

## Installation

1. Clone the repository:

https://github.com/TiwariSudhanshu/Easy-devs-X-AceHack-4.0.git
cd secure-supply-chain


2. Install dependencies:

npm install


3. Configure environment variables:

cp .env.example .env

Edit the .env file with your configuration details.

4. Start the server:

node app.js


## API Endpoints

### Add Product
POST /add-product
Registers a new product on the blockchain.

### Get Product
GET /get-product/:id
Retrieves detailed information about a specific product.

### Transfer Product
POST /transfer-product
Transfers ownership of a product to a new entity in the supply chain.

## Configuration

The application can be configured using environment variables:

- PORT: Server port (default: 3000)
- BLOCKCHAIN_NETWORK: Ethereum network to connect to (e.g., mainnet, rinkeby, local)
- CONTRACT_ADDRESS: Address of the deployed smart contract
- WALLET_PRIVATE_KEY: Private key for transaction signing


## Smart Contracts

The contracts/ directory contains Solidity smart contracts for the supply chain management system:

- ProductTracking.sol: Main contract for product registration and ownership transfer
- SupplyChainUtils.sol: Utility functions for the supply chain

## Testing

Run the test suite with:

npm test


## Development

1. Start the development server:

npm run dev


2. Deploy the smart contracts (requires a configured blockchain provider):

npm run deploy-contracts


## Security Considerations

- Private keys should never be committed to the repository
- All API endpoints require authentication
- Smart contract functions include access control modifiers
- Gas limits are implemented to prevent DoS attacks

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Team Name - Easy Devs
