import { HttpRequest, HttpResponse } from "../../infra/http/http-adapter"
import { BookDto, bookSchema } from "../dto/books-dto"

class BooksController {
  constructor() {}

  show() {}

  find() {}

  async create(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const books: BookDto = bookSchema.parse(HttpRequest.body)

      if (!books) {
        return {
          status: 400,
          message: "Missing Body",
        }
      }

      return {
        status: 201,
        message: "Livro criado com sucesso",
      }
    } catch (error) {
      return {
        status: 400,
        message: "Ocorreu um erro ao tentar criar o livro",
        error: error,
      }
    }
  }
}

export { BooksController }
