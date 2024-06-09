import express, { Application } from "express"

class App {
  app: Application
  constructor() {
    this.app = express()
  }

  listen() {
    const port = 3213
    this.app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    )
  }
}

export default App
