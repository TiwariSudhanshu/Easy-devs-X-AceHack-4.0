import mongoose from 'mongoose';

export default async function dbConnection(){
    try {
        const connectionInstance = await mongoose.connect("db url")
        console.log(`Connected to ${connectionInstance}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}