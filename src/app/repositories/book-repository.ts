import { Book } from '@app/entities/book';

export abstract class BookRepository {
  abstract create(book: Book): Promise<void>;
  abstract findById(bookId: string): Promise<Book | null>;
  abstract update(book: Book): Promise<void>;
  abstract list(): Promise<Book[]>;
}
