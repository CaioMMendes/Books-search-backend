import express, { Application } from "express"
import cors from "cors"
import { errorMiddleware } from "../middleware/error-middleware"
import { BooksRoutes } from "../router/books-routes"

class Express {
  app: Application
  constructor() {
    this.app = express()
    this.initMiddlewares()

    BooksRoutes(this.app)
  }

  private initMiddlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
  }

  listen() {
    const port = 3213
    this.app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    )
  }
}

export default Express
