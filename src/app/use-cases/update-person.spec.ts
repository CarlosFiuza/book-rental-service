import InMemPersonRepository from '@test/repositories/in-memory-person-repository';
import { makePerson } from '@test/factories/person-factory';
import { UpdatePerson } from './update-person';

describe('Person', () => {
  let personRepository: InMemPersonRepository;

  beforeEach(() => (personRepository = new InMemPersonRepository()));

  it('Should be able to update person', async () => {
    const person = makePerson();

    personRepository.create(person);

    person.address = 'rua 2';
    person.dateOfbirth = new Date();
    person.cpf = '203902302';
    person.name = 'Jesuita';

    const updatePerson = new UpdatePerson(personRepository);

    const { person: personUpdated } = await updatePerson.execute(person);

    expect(personRepository.persons).toHaveLength(1);
    expect(personRepository.persons.at(0)).toEqual(personUpdated);
  });
});
