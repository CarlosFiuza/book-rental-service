import InMemPersonRepository from '@test/repositories/in-memory-person-repository';
import { FindPersonsByProp } from './find-persons-by-prop';
import { makePerson } from '@test/factories/person-factory';
import { PersonNotFound } from './errors/person-errors';

describe('Find person by props', () => {
  let personRepository: InMemPersonRepository;
  let findByProp: FindPersonsByProp;

  beforeEach(() => {
    personRepository = new InMemPersonRepository();
    findByProp = new FindPersonsByProp(personRepository);
  });

  it('Should be able to find persons by name', async () => {
    await personRepository.create(makePerson({ name: 'jose leoncio' }));
    await personRepository.create(makePerson({ name: 'jose silva' }));

    const { persons: personsFinded } = await findByProp.execute({
      name: 'jose',
    });

    expect(personRepository.persons).toHaveLength(2);
    expect(personRepository.persons).toEqual(personsFinded);
  });

  it('Should be able to find persons by cpf', async () => {
    const person = makePerson({ cpf: '123' });

    await personRepository.create(person);

    const { persons: personsFinded } = await findByProp.execute({
      cpf: '123',
    });

    expect(personRepository.persons).toHaveLength(1);
    expect(personRepository.persons).toEqual(personsFinded);
  });

  it('Should not be able to find non existing person', async () => {
    expect(async () => {
      return await findByProp.execute({ name: 'non existing' });
    }).rejects.toThrow(PersonNotFound);
  });
});
