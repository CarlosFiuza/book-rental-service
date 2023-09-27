import { Person, IPersonProps } from '@app/entities/person';

type Override = Partial<IPersonProps>;

export function makePerson(override: Override = {}) {
  return new Person({
    name: 'Jose',
    cpf: '122103232-21',
    dateOfbirth: new Date(),
    address: 'rua 1 quadra 1',
    ...override,
  });
}
