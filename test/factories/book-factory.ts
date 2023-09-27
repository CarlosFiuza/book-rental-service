import { Book, IBookProps } from '@app/entities/book';

type Override = Partial<IBookProps>;

export function makeBook(override: Override = {}) {
  return new Book({
    title: 'Percy Jackson: O ladrão de raios',
    author: 'Rick Riordan',
    isbn: '23291312392',
    ...override,
  });
}
