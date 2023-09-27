import InMemBookRepository from '@test/repositories/in-memory-book-repository';
import { UpdateBook } from './update-book';
import { makeBook } from '@test/factories/book-factory';

describe('Update book', () => {
  let bookRepository: InMemBookRepository;

  beforeEach(() => (bookRepository = new InMemBookRepository()));

  it('Should be able to update a book', async () => {
    const book = makeBook({ title: 'Title 1' });
    await bookRepository.create(book);

    book.title = 'Percy Jackson: A Marca de Atena';
    book.desactivate();
    book.author = 'Rick Riordan Silva';
    book.isbn = '03924934';

    const updateBook = new UpdateBook(bookRepository);

    const { book: updatedBook } = await updateBook.execute(book);

    expect(bookRepository.books).toHaveLength(1);
    expect(bookRepository.books.at(0)).toEqual(updatedBook);
  });
});
