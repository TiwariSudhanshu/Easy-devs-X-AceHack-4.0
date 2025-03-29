import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config()


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// PRODUCT ROUTE
import { productRouter } from './routes/product.route.js';

app.use('/api/v1/', productRouter)

export {app}