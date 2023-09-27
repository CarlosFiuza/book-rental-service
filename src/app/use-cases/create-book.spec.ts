import InMemBookRepository from '@test/repositories/in-memory-book-repository';
import { makeBook } from '@test/factories/book-factory';
import { CreateBook } from './create-book';

describe('Create book', () => {
  let bookRepository: InMemBookRepository;

  beforeEach(() => (bookRepository = new InMemBookRepository()));

  it('Should be able to create a book', async () => {
    const createBook = new CreateBook(bookRepository);

    const { book } = await createBook.execute(makeBook());

    expect(bookRepository.books).toHaveLength(1);
    expect(bookRepository.books.at(0)).toEqual(book);
  });
});
