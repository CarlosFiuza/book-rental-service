export class BookNotFound extends Error {
  constructor() {
    super('Book not exists!');
  }
}
