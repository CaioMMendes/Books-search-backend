import { HttpRequest, HttpResponse } from "../../infra/http/http-adapter"
import { BookDto, bookSchema } from "../dto/books-dto"
import { BooksUseCase } from "../useCases/books-useCases"

class BooksController {
  constructor(private readonly booksUseCase: BooksUseCase) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const books: BookDto = bookSchema.parse(httpRequest.body)

      if (!books) {
        return {
          status: 400,
          message: "Missing Body",
        }
      }

      const response = await this.booksUseCase.createBook(books)

      return {
        status: 201,
        message: "Livro criado com sucesso",
        data: response,
      }
    } catch (error) {
      return {
        status: 400,
        message: "Ocorreu um erro ao tentar criar o livro",
        error: error,
      }
    }
  }

  async find(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const dto: BookDto = httpRequest.query

      if (!dto) {
        return {
          status: 400,
          message: "Missing query",
        }
      }

      const response = await this.booksUseCase.findBook(dto)

      return {
        status: 200,
        message: "Livro encontrado com sucesso",
        data: response,
      }
    } catch (error) {
      return {
        status: 400,
        message: "Ocorreu um erro ao tentar encontrar o livro",
        error: error,
      }
    }
  }
  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const dto: BookDto = httpRequest.body
      const id: string = httpRequest.params.id

      if (!dto) {
        return {
          status: 400,
          message: "Missing query",
        }
      }

      const response = await this.booksUseCase.updateBook(dto, id)

      return {
        status: 200,
        message: "Livro encontrado com sucesso",
        data: response,
      }
    } catch (error) {
      return {
        status: 400,
        message: "Ocorreu um erro ao tentar encontrar o livro",
        error: error,
      }
    }
  }
}

export { BooksController }
