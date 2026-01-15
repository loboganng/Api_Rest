import { Request, Response } from "express";
import { AppError } from "../utils/app-error.js";
import { z } from "zod"

class ProductsController {
  //Máximo de 5 métodos
  // INDEX - GET para listar vários registros.
  // SHOW - GET para exibir um registro específico
  // CREATE - POST pra criar um registro
  // UPDATE - PUT para atualizar um registro
  // REMOVE - DELETE para deletar um registro

  index(request: Request, response: Response){
    const { page, limit } = request.query

    response.send(`Page ${page} of ${limit}`)
  }

  create(request: Request, response: Response){

    const bodySchema = z.object({
      name: z
        .string()
        .min(6, { message: "Name must be 6 characters minimum." })  //Min Chars, msng opcional
        .trim() //Remove espaços
        .nullish(), //Nullish transforma o campo em opcional
       //Required_error customiza a msg de erro
      price: z
        .number({ required_error: "Price is required" })
        .positive({ message: "Price must be positive" })
        .gte(50)  //Valida se é >= a 10
    })

    const { name, price } = bodySchema.parse(request.body)
    
    response.status(201).json({ name, price, user_id: request.user_id })
  }
}

export { ProductsController }