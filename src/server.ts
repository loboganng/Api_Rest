import express, { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"

import { routes } from "./routes/index.js"

import { AppError } from "./utils/app-error.js"

const PORT = 3333

const app = express()
app.use(express.json())

app.use(routes)

// O _ no parâmetro é só pra esconder uma função que não vamos usar ainda
app.use((error: any, request: Request, response: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return response
    .status(error.statusCode)
    .json({ message: error.message })
  }

  if (error instanceof ZodError) {
    return response
    .status(400)
    .json({ message: "Validation error.", issues: error.format()})
  }

  response.status(500).json({ message: error.message})
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))