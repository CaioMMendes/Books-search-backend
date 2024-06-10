import mongoose from "mongoose"
import { BookDto } from "../../app/dto/books-dto"
import { BooksRepository } from "../../app/repository/books-repository"
import { BookEntity } from "../../domain/entity/book-entity"

const booksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isbn: { type: String, required: true },
  pageCount: { type: Number, required: true },
  publishedDate: { type: { $date: Date }, required: false },
  thumbnailUrl: { type: String, required: true },
  shortDescription: { type: String, required: false },
  longDescription: { type: String, required: false },
  status: { type: String, required: true },
  authors: { type: [String], required: true },
  categories: { type: [String], required: true },
})

const Books = mongoose.model("books", booksSchema)

class BooksRepositoryMongoose implements BooksRepository {
  create(dto: BookDto) {
    const books = new Books(dto)
    return books.save()
  }

  async find(dto: BookDto): Promise<BookEntity | null> {
    const response = await Books.findOne({ title: dto.title })
    return response ? response.toObject() : null
  }
  async update(dto: BookDto, id: string): Promise<BookEntity | null> {
    const response = await Books.findByIdAndUpdate(id, dto)
    return response ? response.toObject() : null
  }
}

export { BooksRepositoryMongoose }
