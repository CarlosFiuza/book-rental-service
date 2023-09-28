import InMemPersonRepository from '@test/repositories/in-memory-person-repository';
import { makePerson } from '@test/factories/person-factory';
import { UpdatePerson } from './update-person';
import { PersonNotFound } from './errors/person-errors';

describe('Person', () => {
  let personRepository: InMemPersonRepository;
  let updatePerson: UpdatePerson;

  beforeEach(() => {
    personRepository = new InMemPersonRepository();
    updatePerson = new UpdatePerson(personRepository);
  });

  it('Should be able to update person', async () => {
    const person = makePerson();

    personRepository.create(person);

    person.address = 'rua 2';
    person.dateOfbirth = new Date();
    person.cpf = '203902302';
    person.name = 'Jesuita';

    const { person: personUpdated } = await updatePerson.execute(person);

    expect(personRepository.persons).toHaveLength(1);
    expect(personRepository.persons.at(0)).toEqual(personUpdated);
  });

  it('Should not be able to find non existing person', async () => {
    expect(async () => {
      await updatePerson.execute(makePerson());
    }).rejects.toThrow(PersonNotFound);
  });
});
