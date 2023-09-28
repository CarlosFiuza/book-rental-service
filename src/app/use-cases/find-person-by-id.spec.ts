import InMemPersonRepository from '@test/repositories/in-memory-person-repository';
import { FindPersonById } from './find-person-by-id';
import { makePerson } from '@test/factories/person-factory';
import { PersonNotFound } from './errors/person-errors';

describe('Find person by id', () => {
  let personRepository: InMemPersonRepository;
  let findById: FindPersonById;

  beforeEach(() => {
    personRepository = new InMemPersonRepository();
    findById = new FindPersonById(personRepository);
  });

  it('Should be able to find person by id', async () => {
    const person = makePerson();

    await personRepository.create(person);

    const { person: personFinded } = await findById.execute({ id: person.id });

    expect(personRepository.persons).toHaveLength(1);
    expect(personRepository.persons.at(0)).toEqual(personFinded);
  });

  it('Should not be able to find non existing person', async () => {
    expect(async () => {
      await findById.execute({ id: 'non existing' });
    }).rejects.toThrow(PersonNotFound);
  });
});
