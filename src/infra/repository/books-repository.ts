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
  embeddings: { type: [Number], required: false },
})

const Books = mongoose.model("books", booksSchema)

class BooksRepositoryMongoose implements BooksRepository {
  create(dto: BookDto) {
    const books = new Books(dto)
    return books.save()
  }

  async find(
    search: string,
    embedding: number[],
    matchedBooks: Record<string, any>
  ): Promise<BookEntity[] | null> {
    const response = await Books.aggregate([
      {
        $vectorSearch: {
          index: "embeddings",
          limit: 10,
          numCandidates: 20,
          queryVector: embedding,
          path: "embeddings",
        },
      },
      {
        $match: {
          $or: [
            { title: new RegExp(matchedBooks.title, "i") },
            { authors: new RegExp(matchedBooks.authors, "i") },
            { categories: new RegExp(matchedBooks.categories, "i") },
            { longDescription: new RegExp(matchedBooks.longDescription, "i") },
          ],
        },
      },

      {
        $project: {
          id: 1,
          title: 1,
          isbn: 1,
          pageCount: 1,
          publishedDate: 1,
          thumbnailUrl: 1,
          shortDescription: 1,
          longDescription: 1,
          status: 1,
          authors: 1,
          categories: 1,
          embeddings: 0,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ])
    return response
  }
  async update(dto: BookDto, id: string): Promise<BookEntity | null> {
    const response = await Books.findByIdAndUpdate(id, dto)
    return response ? response.toObject() : null
  }
}

export { BooksRepositoryMongoose }
