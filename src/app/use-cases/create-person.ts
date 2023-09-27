import { Person } from '@app/entities/person';
import { PersonRepository } from '@app/repositories/person-repository';
import { Injectable } from '@nestjs/common';

interface ICreatePersonRequest {
  name: string;
  cpf: string;
  dateOfbirth: Date;
  address: string;
  createdAt?: Date;
  isActive?: boolean;
}

interface ICreatePersonResponse {
  person: Person;
}

@Injectable()
export class CreatePerson {
  constructor(private personRepository: PersonRepository) {}

  async execute(request: ICreatePersonRequest): Promise<ICreatePersonResponse> {
    const person = new Person(request);

    await this.personRepository.create(person);

    return {
      person,
    };
  }
}
