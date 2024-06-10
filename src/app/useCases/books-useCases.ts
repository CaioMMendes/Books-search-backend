import { BookDto } from "../dto/books-dto"
import { BooksRepository } from "../repository/books-repository"

class BooksUseCase {
  private booksRepository: BooksRepository
  constructor(booksRepository: BooksRepository) {
    this.booksRepository = booksRepository
  }

  async createBook(dto: BookDto) {
    this.booksRepository.create(dto)
  }
  async findBook(dto: BookDto) {
    this.booksRepository.find(dto)
  }
  async updateBook(dto: BookDto, id: string) {
    this.booksRepository.update(dto, id)
  }
}

export { BooksUseCase }
