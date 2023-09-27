import { Person } from '@app/entities/person';
import { PersonRepository } from '@app/repositories/person-repository';
import { Injectable } from '@nestjs/common';
import { PersonNotFound } from './errors/person-errors';

interface IUpdatePersonRequest {
  id: string;
  name: string;
  cpf: string;
  dateOfbirth: Date;
  address: string;
  createdAt?: Date;
  isActive?: boolean;
}

interface IUpdatePersonResponse {
  person: Person;
}

@Injectable()
export class UpdatePerson {
  constructor(private personRepository: PersonRepository) {}

  async execute(request: IUpdatePersonRequest): Promise<IUpdatePersonResponse> {
    const { id: personId, name, cpf, dateOfbirth, address, isActive } = request;

    const person = await this.personRepository.findById(personId);

    if (!person) {
      throw new PersonNotFound();
    }

    if (name) {
      person.name = name;
    }

    if (cpf) {
      person.cpf = cpf;
    }

    if (dateOfbirth) {
      person.dateOfbirth = dateOfbirth;
    }

    if (address) {
      person.address = address;
    }

    if (isActive) {
      person.activate();
    } else if (isActive === false) {
      person.desactivate();
    }

    await this.personRepository.update(person);

    return {
      person,
    };
  }
}
