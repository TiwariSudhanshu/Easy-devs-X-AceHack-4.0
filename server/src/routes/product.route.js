import { Router } from "express";
import { addProduct } from "../controllers/product.controller.js";

export const productRouter = Router()

productRouter.route("/add-product").post(addProduct)