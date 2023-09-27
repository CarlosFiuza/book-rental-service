import { PersonRepository } from '@app/repositories/person-repository';
import { Injectable } from '@nestjs/common';
import { Person } from '@app/entities/person';

interface IListPersonResponse {
  persons: Person[];
}

@Injectable()
export class ListPerson {
  constructor(private personRepository: PersonRepository) {}

  async execute(): Promise<IListPersonResponse> {
    const persons = await this.personRepository.list();

    return {
      persons,
    };
  }
}
