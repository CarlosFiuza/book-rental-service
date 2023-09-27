import { Book } from '@app/entities/book';
import { BookRepository } from '@app/repositories/book-repository';
import { Injectable } from '@nestjs/common';
import { BookNotFound } from './errors/book-errors';

interface IFindBookByIdRequest {
  id: string;
}

interface IFindBookByIdResponse {
  book: Book;
}

@Injectable()
export class FindBookById {
  constructor(private bookRepository: BookRepository) {}

  async execute(request: IFindBookByIdRequest): Promise<IFindBookByIdResponse> {
    const { id } = request;

    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new BookNotFound();
    }

    return {
      book,
    };
  }
}
