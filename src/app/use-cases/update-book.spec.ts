import InMemBookRepository from '@test/repositories/in-memory-book-repository';
import { UpdateBook } from './update-book';
import { makeBook } from '@test/factories/book-factory';
import { BookNotFound } from './errors/book-errors';

describe('Update book', () => {
  let bookRepository: InMemBookRepository;
  let updateBook: UpdateBook;

  beforeEach(() => {
    bookRepository = new InMemBookRepository();
    updateBook = new UpdateBook(bookRepository);
  });

  it('Should be able to update a book', async () => {
    const book = makeBook({ title: 'Title 1' });
    await bookRepository.create(book);

    book.title = 'Percy Jackson: A Marca de Atena';
    book.desactivate();
    book.author = 'Rick Riordan Silva';
    book.isbn = '03924934';

    const { book: updatedBook } = await updateBook.execute(book);

    expect(bookRepository.books).toHaveLength(1);
    expect(bookRepository.books.at(0)).toEqual(updatedBook);
  });

  it('Should not be able to find non existing book', async () => {
    expect(async () => {
      return await updateBook.execute({ id: 'non existing' });
    }).rejects.toThrow(BookNotFound);
  });
});
