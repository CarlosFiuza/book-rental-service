import { Book } from '@app/entities/book';
import { BookRepository } from '@app/repositories/book-repository';
import { Injectable } from '@nestjs/common';

interface ICreateBookRequest {
  title: string;
  author: string;
  isbn: string;
  createdAt?: Date;
  isActive?: boolean;
}

interface ICreateBookResponse {
  book: Book;
}

@Injectable()
export class CreateBook {
  constructor(private bookRepository: BookRepository) {}

  async execute(request: ICreateBookRequest): Promise<ICreateBookResponse> {
    const book = new Book(request);

    await this.bookRepository.create(book);

    return {
      book,
    };
  }
}
