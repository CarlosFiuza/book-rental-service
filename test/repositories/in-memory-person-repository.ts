import { Person } from '@app/entities/person';
import {
  PersonRepository,
  IManyByProps,
} from '@app/repositories/person-repository';

export default class InMemPersonRepository implements PersonRepository {
  public persons: Person[] = [];

  async create(person: Person): Promise<void> {
    this.persons.push(person);
  }
  async findById(personId: string): Promise<Person | null> {
    const person = this.persons.find((p) => p.id === personId);

    return person ?? null;
  }
  async update(person: Person): Promise<void> {
    const personIndex = this.persons.findIndex((p) => p.id === person.id);

    if (personIndex > -1) {
      this.persons.splice(personIndex, 1, person);
    }
  }
  async findManyByProps(prop: IManyByProps): Promise<Person[] | null> {
    const persons = this.persons.filter((p) => {
      if (prop.cpf) return p.cpf.includes(prop.cpf);
      if (prop.name) return p.name.includes(prop.name);
      return true;
    });

    if (persons.length === 0) return null;
    return persons;
  }
  async list(): Promise<Person[]> {
    return this.persons;
  }
}
