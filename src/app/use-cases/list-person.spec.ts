import { makePerson } from '@test/factories/person-factory';
import InMemPersonRepository from '@test/repositories/in-memory-person-repository';
import { ListPerson } from './list-person';

describe('List person', () => {
  let personRepository: InMemPersonRepository;

  beforeEach(() => (personRepository = new InMemPersonRepository()));

  it('Should be able to list persons', async () => {
    await personRepository.create(makePerson({ cpf: '123' }));
    await personRepository.create(makePerson({ cpf: '1234' }));
    await personRepository.create(makePerson({ cpf: '12345' }));
    await personRepository.create(makePerson({ cpf: '123456' }));
    await personRepository.create(makePerson({ cpf: '1234567' }));

    const listPerson = new ListPerson(personRepository);

    const { persons } = await listPerson.execute();

    expect(personRepository.persons).toHaveLength(5);
    expect(personRepository.persons).toEqual(persons);
  });
});
