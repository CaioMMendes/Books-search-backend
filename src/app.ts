import express, { Application } from "express"
import cors from "cors"
class App {
  app: Application
  constructor() {
    this.app = express()
  }

  initMiddlewares() {
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

export default App
