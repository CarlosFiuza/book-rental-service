import { Book } from '@app/entities/book';
import { BookRepository } from '@app/repositories/book-repository';
import { Injectable } from '@nestjs/common';

interface IListBookResponse {
  books: Book[];
}

@Injectable()
export class ListBook {
  constructor(private bookRepository: BookRepository) {}

  async execute(): Promise<IListBookResponse> {
    const books = await this.bookRepository.list();

    return {
      books,
    };
  }
}
