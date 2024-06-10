import { Router } from "express"
import { BooksController } from "../../app/controller/books-controller"
import routerAdapter from "./router-adapter"
import { BooksRepositoryMongoose } from "../repository/books-repository"
import { BooksUseCase } from "../../app/useCases/books-useCases"

const BooksRoutes = (router: Router) => {
  const booksUseCase = new BooksUseCase(new BooksRepositoryMongoose())
  const booksController = new BooksController(booksUseCase)

  router.post("/books", routerAdapter(booksController, "create"))
  router.get("/books", routerAdapter(booksController, "find"))
  router.put("/books/:id", routerAdapter(booksController, "update"))
}

export { BooksRoutes }
