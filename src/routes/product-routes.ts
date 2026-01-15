import { Router } from "express";
import { myMiddleware } from "../middleware/my-middleware.js";
import { ProductsController } from "../controllers/products-controller.js";


const productsRoutes = Router()
const productsController = new ProductsController()

//Recuperando id
productsRoutes.get("/", productsController.index)

//Pra adicionar um middleware local, basta inserir dentro da rota
productsRoutes.post("/", myMiddleware, productsController.create)

export { productsRoutes }