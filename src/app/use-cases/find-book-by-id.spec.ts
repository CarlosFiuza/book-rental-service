import InMemBookRepository from '@test/repositories/in-memory-book-repository';
import { FindBookById } from './find-book-by-id';
import { makeBook } from '@test/factories/book-factory';
import { BookNotFound } from './errors/book-errors';

describe('Find book by id', () => {
  let bookRepository: InMemBookRepository;
  let findById: FindBookById;

  beforeEach(() => {
    bookRepository = new InMemBookRepository();
    findById = new FindBookById(bookRepository);
  });

  it('Should be able find book by id', async () => {
    const book = makeBook({ title: 'Title 1' });
    await bookRepository.create(book);

    const { book: findedBook } = await findById.execute({ id: book.id });

    expect(bookRepository.books).toHaveLength(1);
    expect(bookRepository.books.at(0)).toEqual(findedBook);
  });

  it('Should not be able to find non existing book', async () => {
    expect(async () => {
      return await findById.execute({ id: 'non existing' });
    }).rejects.toThrow(BookNotFound);
  });
});
