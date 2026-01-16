#  RESTful API Practice: TypeScript + Node.js + Express + Zod 

This project demonstrates production-ready REST API patterns using Node.js, Express.js, and Zod validation. 
Every architectural decision follows modern TypeScript best practices, showcasing clean separation of concerns, type-safe middleware, and robust error handling.

---


## Key features implemented

- RESTful Controllers **(Index/Create patterns)**
- **Zod** Runtime Validation with custom messages
- Type-Augmented Express request interface
- Custom middleware pipeline
- Global error boundaries (AppError + ZodError)
- Modular router architecture
- Proper **HTTP Status codes (201 Created)**

---

##  Tecnologias utilizadas

- **Node.js**
- **TypeScript**
- **Express.js**
- **Zod**
- ** Git e GitHub para versionamento de código **

---

## Architecture Overview 

src/
├── controllers/     # REST Controllers (ProductsController)
├── middleware/      # Custom middleware (myMiddleware)  
├── routes/          # Modular routing (productsRoutes)
├── utils/           # AppError + Type declarations
└── app.ts           # Express setup + Error handling

---

## Code Highlight 
```ts
const bodySchema = z.object({
  name: z.string()
    .min(6, { message: "Name must be 6 characters minimum." })
    .trim()
    .nullish(),
  price: z.number({ required_error: "Price is required" })
    .positive({ message: "Price must be positive" })
    .gte(50)
})
```
---

## Type-Safe Middleware 
```ts
declare namespace Express {
  export interface Request { user_id: string }
}

export function myMiddleware(req: Request, res: Response, next: NextFunction) {
  req.user_id = "123456"  // Production: JWT decoded user
  console.log("Middleware working")
  next()
}
```

---

##  Production Error-handling
```ts
app.use((error: any, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message })
  }
  if (error instanceof ZodError) {
    return res.status(400).json({ 
      message: "Validation error.", 
      issues: error.format() 
    })
  }
  res.status(500).json({ message: error.message })
})
```
---

## Learning outcomes

- REST Conventions: INDEX(List), CREATE(Post) patterns
- Zod Mastery: Chaining .min(), .positive(), .gte(), custom messages
- TypeScript: Interface augmentation for Express Request
- Middleware: Request lifecycle injection
- Error Boundaries: Custom AppError + ZodError formatting
- Modularity: Feature-based routing (productsRoutes)

---

## Quick Start
```
npm install
npm start  #http://localhost:3333
npm run dev
```
---

## Future enhancements

- Prisma + PostgreSQL integration
- JWT Authentication 
- Full CRUD (SHOW/UPDATE/DELETE)
- Pagination implementation
- Docker + Docker Compose
- Unit/Integration tests (Jest)
- OpenAPI/Swagger docs
