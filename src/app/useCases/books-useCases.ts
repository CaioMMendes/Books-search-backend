import { generateEmbeddings } from "../../infra/services/openai/generateEmbeddings"
import { searchOpenAI } from "../../infra/services/openai/search"
import { BookDto } from "../dto/books-dto"
import { BooksRepository } from "../repository/books-repository"

export type GptResponse = {
  title: string
  authors: string
  categories: string
  longDescription: string
}
class BooksUseCase {
  private booksRepository: BooksRepository
  constructor(booksRepository: BooksRepository) {
    this.booksRepository = booksRepository
  }

  async createBook(dto: BookDto) {
    const dataEmbedding = {
      title: dto.title,
      categories: dto.categories,
      authors: dto.authors,
      longDescription: dto.longDescription,
    }
    const generateEmbedding = await generateEmbeddings(
      JSON.stringify(dataEmbedding)
    )
    this.booksRepository.create({ ...dto, embeddings: generateEmbedding })
  }
  async findBook(search: string) {
    const generateEmbedding = await generateEmbeddings(search)
    const searchOpen: GptResponse = await searchOpenAI(search)
    const matchedBooks = this.matchedBooks(searchOpen)
    this.booksRepository.find(search, generateEmbedding, matchedBooks)
  }
  async updateBook(dto: BookDto, id: string) {
    const dataEmbedding = {
      title: dto.title,
      categories: dto.categories,
      authors: dto.authors,
      longDescription: dto.longDescription,
    }
    const generateEmbedding = await generateEmbeddings(
      JSON.stringify(dataEmbedding)
    )

    this.booksRepository.update({ ...dto, embeddings: generateEmbedding }, id)
  }

  private matchedBooks(search: GptResponse): Record<string, any> {
    const matchedBooks = { $match: {} }

    if (search.title) {
      matchedBooks.$match = {
        title: search.title,
      }
    }
    if (search.categories) {
      matchedBooks.$match = {
        categories: search.categories,
      }
    }
    if (search.authors) {
      matchedBooks.$match = {
        authors: search.authors,
      }
    }
    if (search.longDescription) {
      matchedBooks.$match = {
        longDescription: search.longDescription,
      }
    }
    return matchedBooks
  }
}

export { BooksUseCase }
