import { Book } from '@app/entities/book';
import { BookRepository } from '@app/repositories/book-repository';
import { BookNotFound } from './errors/book-errors';
import { Injectable } from '@nestjs/common';

interface IUpdateBookRequest {
  id: string;
  title?: string;
  author?: string;
  isbn?: string;
  createdAt?: Date;
  isActive?: boolean;
}

interface IUpdateBookResponse {
  book: Book;
}

@Injectable()
export class UpdateBook {
  constructor(private bookRepository: BookRepository) {}

  async execute(request: IUpdateBookRequest): Promise<IUpdateBookResponse> {
    const { id: bookId, title, author, isbn, isActive } = request;

    const book = await this.bookRepository.findById(bookId);

    if (!book) {
      throw new BookNotFound();
    }

    if (isActive) {
      book.activate();
    } else if (isActive === false) {
      book.desactivate();
    }

    if (title) {
      book.title = title;
    }

    if (author) {
      book.author = author;
    }

    if (isbn) {
      book.isbn = isbn;
    }

    await this.bookRepository.update(book);

    return {
      book,
    };
  }
}
