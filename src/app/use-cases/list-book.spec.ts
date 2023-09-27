import InMemBookRepository from '@test/repositories/in-memory-book-repository';
import { ListBook } from './list-book';
import { makeBook } from '@test/factories/book-factory';

describe('List book', () => {
  let bookRepository: InMemBookRepository;

  beforeEach(() => (bookRepository = new InMemBookRepository()));

  it('Should be able to list books', async () => {
    await bookRepository.create(makeBook({ title: 'Title 1' }));
    await bookRepository.create(makeBook({ title: 'Title 2' }));
    await bookRepository.create(makeBook({ title: 'Title 3' }));

    const listBook = new ListBook(bookRepository);

    const { books: listedBooks } = await listBook.execute();

    expect(bookRepository.books).toHaveLength(3);
    expect(bookRepository.books).toEqual(listedBooks);
  });
});
