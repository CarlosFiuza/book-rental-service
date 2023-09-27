import { Person } from '@app/entities/person';
import { PersonRepository } from '@app/repositories/person-repository';
import { Injectable } from '@nestjs/common';
import { PersonNotFound } from './errors/person-errors';

interface IFindPersonByIdRequest {
  id: string;
}

interface IFindPersonByIdResponse {
  person?: Person;
}

@Injectable()
export class FindPersonById {
  constructor(private personRepository: PersonRepository) {}

  async execute(
    request: IFindPersonByIdRequest,
  ): Promise<IFindPersonByIdResponse> {
    const person = await this.personRepository.findById(request.id);

    if (!person) {
      throw new PersonNotFound();
    }

    return {
      person,
    };
  }
}
