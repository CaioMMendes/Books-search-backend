class BookEntity {
  constructor(
    public title: string,
    public isbn: string,
    public pageCount: number,
    public publishedDate: Date,
    public thumbnailUrl: string,
    public shortDescription: string,
    public longDescription: string,
    public status: string,
    public authors: string[],
    public categories: string[]
  ) {
    ;(this.title = title),
      (this.isbn = isbn),
      (this.pageCount = pageCount),
      (this.publishedDate = publishedDate),
      (this.thumbnailUrl = thumbnailUrl),
      (this.shortDescription = shortDescription),
      (this.longDescription = longDescription),
      (this.status = status),
      (this.authors = authors),
      (this.categories = categories)
  }
}

export { BookEntity }
