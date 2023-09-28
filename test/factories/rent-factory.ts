import { IRentProps, Rent } from '@app/entities/rent';
import { randomUUID } from 'node:crypto';

type Override = Partial<IRentProps>;

export function makeRent(override: Override = {}) {
  return new Rent({
    personId: randomUUID(),
    replicaId: randomUUID(),
    isActive: true,
    returnedAt: null,
    expectedReturnAt: new Date(),
    ...override,
  });
}
