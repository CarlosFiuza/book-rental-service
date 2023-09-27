import InMemPersonRepository from '@test/repositories/in-memory-person-repository';
import { CreatePerson } from './create-person';
import { makePerson } from '@test/factories/person-factory';

describe('Create person', () => {
  let personRepository: InMemPersonRepository;

  beforeEach(() => (personRepository = new InMemPersonRepository()));

  it('Should be able to create a person', async () => {
    const createPerson = new CreatePerson(personRepository);

    const { person } = await createPerson.execute(makePerson());

    expect(personRepository.persons).toHaveLength(1);
    expect(personRepository.persons.at(0)).toEqual(person);
  });
});
