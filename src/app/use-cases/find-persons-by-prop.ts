import { Person } from '@app/entities/person';
import { PersonRepository } from '@app/repositories/person-repository';
import { Injectable } from '@nestjs/common';
import { PersonNotFound } from './errors/person-errors';

interface IFindPersonsByPropRequest {
  name?: string;
  cpf?: string;
}

interface IFindPersonsByPropResponse {
  persons?: Person[];
}

@Injectable()
export class FindPersonsByProp {
  constructor(private personRepository: PersonRepository) {}

  async execute(
    request: IFindPersonsByPropRequest,
  ): Promise<IFindPersonsByPropResponse> {
    const persons = await this.personRepository.findManyByProps(request);

    if (!persons) {
      throw new PersonNotFound();
    }

    return {
      persons,
    };
  }
}
