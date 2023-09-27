export class PersonNotFound extends Error {
  constructor() {
    super('Person not exists!');
  }
}
