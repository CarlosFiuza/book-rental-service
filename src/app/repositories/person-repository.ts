import { Person } from '@app/entities/person';

export interface IManyByProps {
  name?: string;
  cpf?: string;
}

export abstract class PersonRepository {
  abstract create(person: Person): Promise<void>;
  abstract findById(personId: string): Promise<Person | null>;
  abstract update(person: Person): Promise<void>;
  abstract findManyByProps(props: IManyByProps): Promise<Person[] | null>;
  abstract list(): Promise<Person[]>;
}
