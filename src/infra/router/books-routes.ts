import { Router } from "express"
import { BooksController } from "../../app/controller/books-controller"
import routerAdapter from "./router-adapter"

const BooksRoutes = (router: Router) => {
  const booksController = new BooksController()

  router.post("/books", routerAdapter(booksController, "create"))
}

export { BooksRoutes }
