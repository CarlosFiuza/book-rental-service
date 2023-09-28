import { Book } from '@app/entities/book';
import { BookRepository } from '@app/repositories/book-repository';

export default class InMemBookRepository implements BookRepository {
  public books: Book[] = [];

  async create(book: Book): Promise<void> {
    this.books.push(book);
  }
  async findById(bookId: string): Promise<Book | null> {
    const book = this.books.find((bk) => bk.id === bookId);

    return book ?? null;
  }
  async update(book: Book): Promise<void> {
    const bookIndex = this.books.findIndex((bk) => bk.id === book.id);

    if (bookIndex > -1) {
      this.books.splice(bookIndex, 1, book);
    }
  }
  async list(): Promise<Book[]> {
    return this.books.filter((b) => b.isActive);
  }
}
